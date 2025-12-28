| Directive    | Think of it as     |

| ------------ | ------------------ |

| `root`       | Where files live   |

| `try\_files`  | Safety check       |

| `alias`      | Path replacement   |

| `index`      | Default file       |

| `return`     | Immediate response |

| `rewrite`    | URL surgery        |

| `autoindex`  | Folder listing     |

| `proxy\_pass` | Backend routing    |





Great 👍

Now you’re asking the \*\*right nginx questions\*\*.

I’ll explain the \*\*MOST IMPORTANT nginx directives\*\* you’ll actually use — \*\*root, try\_files, alias, index, return, rewrite, autoindex, proxy\_pass, error\_page\*\* — \*\*with YOUR folder structure\*\* so everything connects.



I’ll keep it \*\*clear, practical, and confusion-free\*\*.



---



\# 📁 Your Project (Reference)



```

/var/www/site/

├── index.html

├── abouts.html

├── error.html

├── script.js

├── style.css

├── media/

│   └── bye-bye-tata.mp4

└── images/

&nbsp;   ├── javascript-course.webp

&nbsp;   └── nodejs-course.webp

```



---



\# 1️⃣ `root` — WHERE files live on disk



\### Syntax



```nginx

root /var/www/site;

```



\### What it does



Maps \*\*URL → filesystem\*\*



| URL                       | File                                   |

| ------------------------- | -------------------------------------- |

| `/`                       | `/var/www/site/index.html`             |

| `/media/bye-bye-tata.mp4` | `/var/www/site/media/bye-bye-tata.mp4` |



📌 `root` \*\*appends the full URI\*\*



---



\# 2️⃣ `try\_files` — SAFE FILE LOOKUP (VERY IMPORTANT)



\### Syntax



```nginx

try\_files $uri $uri/ =404;

```



\### What it does (step-by-step)



For request `/abouts.html`:



1\. Try `/abouts.html`

2\. Try `/abouts.html/`

3\. If not found → return `404`



\### Why it’s important



✅ Prevents directory traversal

✅ Avoids weird nginx behavior

✅ Mandatory for SPAs \& static sites



---



\# 3️⃣ `alias` — PATH REPLACEMENT (DIFFERENT FROM root)



\### Syntax



```nginx

location /images/ {

&nbsp;   alias /var/www/assets/images/;

}

```



\### Mapping



| URL                          | File                                        |

| ---------------------------- | ------------------------------------------- |

| `/images/nodejs-course.webp` | `/var/www/assets/images/nodejs-course.webp` |



📌 `alias` \*\*replaces\*\* `/images/`

📌 Must end with `/`



---



\# 4️⃣ `index` — DEFAULT FILE IN A FOLDER



\### Syntax



```nginx

index index.html;

```



\### Behavior



Request:



```

http://localhost/

```



Loads:



```

/var/www/site/index.html

```



Without `index` → 403 Forbidden



---



\# 5️⃣ `autoindex` — DIRECTORY LISTING



\### Syntax



```nginx

location /media/ {

&nbsp;   autoindex on;

}

```



\### Result



Visiting:



```

/media/

```



Shows:



```

bye-bye-tata.mp4

```



⚠ NEVER enable in production unless required



---



\# 6️⃣ `return` — FAST RESPONSE / REDIRECT



\### Redirect



```nginx

return 302 /media/;

```



\### Status response



```nginx

return 200 "OK";

```



\### Why use



✔ Faster than rewrite

✔ Clean

✔ Predictable



---



\# 7️⃣ `rewrite` — URL REWRITING (ADVANCED)



\### Syntax



```nginx

rewrite ^/video/(.\*)$ /media/$1 last;

```



\### Meaning



```

/video/bye.mp4 → /media/bye.mp4

```



⚠ Harder to debug

⚠ Avoid unless needed



---



\# 8️⃣ `error\_page` — CUSTOM ERROR HANDLING



\### Syntax



```nginx

error\_page 404 /error.html;

```



\### Behavior



If file not found:



```

/var/www/site/error.html

```



---



\# 9️⃣ `proxy\_pass` — FOR BACKEND (Node.js)



\### Syntax



```nginx

location /api/ {

&nbsp;   proxy\_pass http://localhost:3000;

}

```



\### Meaning



```

/api/login → Node server

```



---



\# 🔟 `add\_header` — RESPONSE HEADERS



\### Example (mp4 streaming)



```nginx

location ~\* \\.(mp4)$ {

&nbsp;   add\_header Accept-Ranges bytes;

}

```



---



\# 🔁 MOST COMMON COMBINATION (YOU SHOULD REMEMBER)



```nginx

location / {

&nbsp;   root /var/www/site;

&nbsp;   index index.html;

&nbsp;   try\_files $uri $uri/ =404;

}

```



This single block handles:



\* HTML

\* CSS

\* JS

\* images

\* static files



---



\# 🧠 Mental Model (IMPORTANT)



| Directive    | Think of it as     |

| ------------ | ------------------ |

| `root`       | Where files live   |

| `try\_files`  | Safety check       |

| `alias`      | Path replacement   |

| `index`      | Default file       |

| `return`     | Immediate response |

| `rewrite`    | URL surgery        |

| `autoindex`  | Folder listing     |

| `proxy\_pass` | Backend routing    |



---



\# 🎯 Interview-ready one-liner



> \*\*root maps URLs to files, try\_files safely checks existence, alias replaces paths, index loads default files, return redirects or responds, rewrite rewrites URLs, proxy\_pass forwards requests to backend.\*\*



---



If you want next, I can:



\* draw \*\*request flow diagrams\*\*

\* explain \*\*SPA + React routing\*\*

\* show \*\*nginx config for Node + Media app\*\*

\* explain \*\*why try\_files is critical\*\*



Just tell me 👍



