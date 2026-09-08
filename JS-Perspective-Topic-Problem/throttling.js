function throttling(waitTime = 2000) {
  const throttleData = {};

  return (req, res, next) => {
    const now = Date.now();
    const ip = req.ip;

    const { previousDelay, lastRequest } = throttleData[ip] || {
      previousDelay: 0,
      lastRequest: now - waitTime,
    };

    const timePassed = now - lastRequest;
    const delay = Math.max(0, waitTime + previousDelay - timePassed);

    throttleData[ip] = {
      previousDelay: delay,
      lastRequest: now,
    };

    setTimeout(next, delay);
  };
}

/*
Assumption: requests 2–5 arrive at exactly the same time as request 1.

now = 1788892798473

Request 1: 

previousDelay = 0
lastRequest = 1788892796473
timePassed = 2000
delay = 0

throttleData[ip] = {
  previousDelay: 0,
  lastRequest: 1788892798473,
};

Request 2:
previousDelay = 0
lastRequest = 1788892798473
timePassed = 0
delay = max(0, 2000 + 0 - 0) = 2000

throttleData[ip] = {
  previousDelay: 2000,
  lastRequest: 1788892798473,
};

Request 3:
previousDelay = 2000
timePassed = 0
delay = max(0, 2000 + 2000 - 0) = 4000

throttleData[ip] = {
  previousDelay: 4000,
  lastRequest: 1788892798473,
};

Request 4:
previousDelay = 4000
timePassed = 0
delay = max(0, 2000 + 4000 - 0) = 6000

throttleData[ip] = {
  previousDelay: 6000,
  lastRequest: 1788892798473,
};

Request 5:
previousDelay = 6000
timePassed = 0
delay = max(0, 2000 + 6000 - 0) = 8000

throttleData[ip] = {
  previousDelay: 8000,
  lastRequest: 1788892798473,
};

Final delays:
Request 1 → 0 ms
Request 2 → 2000 ms
Request 3 → 4000 ms
Request 4 → 6000 ms
Request 5 → 8000 ms
*/
