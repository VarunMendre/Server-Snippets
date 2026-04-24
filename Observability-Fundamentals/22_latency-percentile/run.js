for (let i = 1; i <= 200; i++) fetch("http://localhost:4000/");
for (let i = 1; i <= 20; i++) fetch("http://localhost:4000/unstable");
for (let i = 1; i <= 5; i++) fetch("http://localhost:4000/system-cpu");

setInterval(() => {
  for (let i = 1; i <= 200; i++) fetch("http://localhost:4000/");
  for (let i = 1; i <= 20; i++) fetch("http://localhost:4000/unstable");
  for (let i = 1; i <= 5; i++) fetch("http://localhost:4000/system-cpu");
}, 50 * 1000);
