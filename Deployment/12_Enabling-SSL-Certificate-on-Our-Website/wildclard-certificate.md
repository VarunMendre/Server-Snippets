## 🧩 Wildcard SSL Setup (Manual DNS Method)

### 📌 Overview

You’ll generate one certificate that covers both:

* `*.procodrrlabs.com` (all subdomains)
* `procodrrlabs.com` (root domain)

---

## ⚙️ Step 1 — Run Certbot command

```bash
sudo certbot certonly --manual --preferred-challenges=dns -d "*.procodrrlabs.com" -d procodrrlabs.com
```

### 🔍 What this does

* `certonly` → only generates certificates (doesn’t edit Nginx automatically).
* `--manual` → lets you manually add DNS TXT records for validation.
* `--preferred-challenges=dns` → uses DNS-01 verification (required for wildcards).
* `-d "*.procodrrlabs.com" -d procodrrlabs.com` → requests one certificate for both wildcard + root.

---

## 🧩 Step 2 — Add TXT record in GoDaddy DNS

After running the command, Certbot will show something like:

```
Please deploy a DNS TXT record under the name
_acme-challenge.procodrrlabs.com with the following value:

XvYsZtQwEr123abc....
```

Go to **GoDaddy → Domain → DNS Zone → Add Record:**

| Field | Value                             |
| ----- | --------------------------------- |
| Type  | TXT                               |
| Name  | _acme-challenge                   |
| Value | XvYsZtQwEr123abc...               |
| TTL   | 600 seconds (or lowest available) |

Save the record.
Wait **1–2 minutes** for DNS propagation (you can verify using:
`dig TXT _acme-challenge.procodrrlabs.com +short`)

---

## 🧩 Step 3 — Continue verification

Return to your terminal and press **Enter** to let Certbot verify the record.
If successful, you’ll see:

```
Congratulations! Your certificate and chain have been saved at:
/etc/letsencrypt/live/procodrrlabs.com/fullchain.pem
Your key file has been saved at:
/etc/letsencrypt/live/procodrrlabs.com/privkey.pem
```

---

## 🧩 Step 4 — Configure Nginx for HTTPS

Open your Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/default
```

Inside your server block for port 443 (or create one), add:

```nginx
server {
    listen 443 ssl;
    server_name api.procodrrlabs.com;

    ssl_certificate     /etc/letsencrypt/live/procodrrlabs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/procodrrlabs.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Then reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🧩 Step 5 — (Optional) Redirect HTTP → HTTPS

If you want all traffic to redirect automatically, add another block:

```nginx
server {
    listen 80;
    server_name procodrrlabs.com *.procodrrlabs.com;
    return 301 https://$host$request_uri;
}
```

Reload again:

```bash
sudo systemctl reload nginx
```

---

## ⚠️ Important Note — Manual Renewal

Since you used the `--manual` method:

* Auto-renew **will not work** (`sudo certbot renew` will fail).
* You must re-run the same command every 90 days.

To check expiry date anytime:

```bash
sudo certbot certificates
```

---

✅ **Summary**

| Step | Command / Action                                                                                        | Notes                   |
| ---- | ------------------------------------------------------------------------------------------------------- | ----------------------- |
| 1    | `sudo certbot certonly --manual --preferred-challenges=dns -d "*.procodrrlabs.com" -d procodrrlabs.com` | Request certificate     |
| 2    | Add TXT record in GoDaddy                                                                               | Verify ownership        |
| 3    | Press Enter to complete                                                                                 | Certificate generated   |
| 4    | Configure Nginx with cert paths                                                                         | Enable HTTPS            |
| 5    | (Optional) Redirect HTTP → HTTPS                                                                        | SEO + security          |
| 🔁   | Re-run every 90 days                                                                                    | Manual renewal required |

