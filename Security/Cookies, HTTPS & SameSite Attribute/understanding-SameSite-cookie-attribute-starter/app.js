import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 4000;

app.use(cookieParser());

const authMiddleware = (req, res, next) => {
  if (req.cookies.sid || req.url === "/login") {
    return next();
  }
  return res.send('You are not logged in<br> <a href="/login">Login</a>');
};

app.use(authMiddleware, express.static("./public"));

app.get("/", authMiddleware, (req, res) => {
  res.send(`Hello World <br> <img src='/cookie.png' width='200'>
    <form action="/cookie.png" method="post">
      <button>Tap to load Img</button>
    </form>
    `);
});

app.post("/cookie.png", authMiddleware, (req, res) => {
  res.sendFile(`${import.meta.dirname}/public/cookie.png`);
});

app.get("/login", (req, res) => {
  res.cookie("sid", "12345", {
    // currently it will load everything on Others/index.html the img tag, <a> tag and form Post button
    // sameSite: "none",

    // if not same origin then it will not sent the cookie,
    // but if there is top level navigation and its GET req then it will set the Cookie,
    // currently iy will Load only the <a> tag which is an cross site top level Navigation

    sameSite: "lax",

    // now it will not set any cookie on cross origin even its GET req ,
    // and we try to load it will be cross site origin only
    //setting secure attribute requires an https server

    // sameSite: "strict",

    //  but on localhost which is an Dev env so can we can use it on http server, currently it will load nothing no img tag, a tag or form post button
    secure: true,
  });
  res.redirect(req.headers.referer || "/");
});

app.listen(PORT, () => {
  console.log(`🚀 Visit http://localhost:${PORT}`);
});
