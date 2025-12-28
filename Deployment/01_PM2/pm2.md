# 💡 What is PM2?

**PM2** stands for **Process Manager 2**.
It’s a **production-grade process manager for Node.js applications**.

In simple terms, PM2 helps you:

* Keep your Node.js app **running forever** (auto restarts if it crashes).
* Manage multiple apps easily (start, stop, restart, logs, etc.).
* Automatically restart apps when your **EC2 instance reboots**.
* Run Node apps with specific **arguments or environment variables**.

---

## ⚙️ Why Do We Use PM2?

Because running an app with `node app.js` is fine for development, but:

* If the app crashes → it stops.
* If you close the terminal → it stops.
* If the EC2 instance restarts → it doesn’t come back up.

PM2 fixes all of that.

---

## 🚀 Essential PM2 Commands (With Explanations)

### 🟢 Start a Process

```bash
pm2 start app.js
```

Starts a Node.js app.

Add a name:

```bash
pm2 start app.js --name "storageApp"
```

---

### ⚙️ Start with Node Arguments

```bash
pm2 start node --name "storageApp" -- --no-deprecation --env-file=.env app.js
```

Explanation:

* First `node` → the command to run
* `--name` → PM2 process name
* Double `--` → separates PM2’s options from Node’s arguments
  (everything after the double dash goes to `node`)

---

### ⚙️ Start an npm Script

```bash
pm2 start npm --name "storageApp" -- run start
```

OR for development mode:

```bash
pm2 start npm --name "storageApp-dev" -- run dev
```

---

### 📋 View Process List

```bash
pm2 list
```

---

### 📜 View Logs

```bash
pm2 logs
```

For a specific app:

```bash
pm2 logs storageApp
```

---

### 🔍 Inspect a Process

```bash
pm2 describe storageApp
```

---

### 🔁 Restart a Process

```bash
pm2 restart storageApp
```

Restart all:

```bash
pm2 restart all
```

---

### 🧹 Stop and Delete

```bash
pm2 stop storageApp
pm2 delete storageApp
```

---

### 💾 Save Processes for Auto-Start on Reboot

Once your apps are running correctly:

```bash
pm2 save
```

Then enable startup script:

```bash
pm2 startup
```

It will print a command — copy and run that command (it sets up auto-launch on reboot).

You can check saved processes:

```bash
pm2 resurrect
```

And clear them:

```bash
pm2 unstartup
```

---

### 📈 Check Process Resource Usage

```bash
pm2 monit
```

Shows real-time CPU & memory usage.

---

### 🔄 Auto-Restart on File Change (for development)

```bash
pm2 start app.js --watch
```

---

### 🧠 View Environment Variables

```bash
pm2 env 0
```

(Replace `0` with your process ID)

---

## ⚡ Typical Production Setup on EC2

```bash
# 1. Start your app
pm2 start node --name "storageApp" -- --no-deprecation --env-file=.env app.js

# 2. Save running processes
pm2 save

# 3. Enable startup on reboot
pm2 startup
# (copy and execute the printed command)

# 4. Verify
sudo reboot
# then after reboot:
pm2 list
```

Your process will come back automatically ✅

---

## 🔥 Bonus Tips

* To see restart count:

  ```bash
  pm2 list
  ```

  The “restart” column shows how many times the process auto-restarted.

* To reset the restart count:

  ```bash
  pm2 reset all
  ```