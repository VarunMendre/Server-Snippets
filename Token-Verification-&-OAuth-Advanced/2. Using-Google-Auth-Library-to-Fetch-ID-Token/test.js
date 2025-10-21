import {OAuth2Client} from 'google-auth-library'

const clientId =
  "341508182755-lcdl3f8mjnntpk1f9amuoa4i36vl6st5.apps.googleusercontent.com";
const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZiOWY5MzcxZDU3NTVmM2UzODNhNDBhYjNhMTcyY2Q4YmFjYTUxN2YiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNDE1MDgxODI3NTUtbGNkbDNmOG1qbm50cGsxZjlhbXVvYTRpMzZ2bDZzdDUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzNDE1MDgxODI3NTUtbGNkbDNmOG1qbm50cGsxZjlhbXVvYTRpMzZ2bDZzdDUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY4NDQ5NjQ5MzAzNjUxODgwNTgiLCJoZCI6ImFzbWVkdS5vcmciLCJlbWFpbCI6InZhcnVubWVuZHJlQGFzbWVkdS5vcmciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjRDYkFFeVFYR1RWNVU2R0V0aHZuRFEiLCJuYW1lIjoiVmFydW4gTWVuZHJlIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tIOUE3emFPN2dwb2ZRMG5VNU1QWk00TGFnZ2NUWjBlNDc1S2pZai1NOUJvN2w0QT1zOTYtYyIsImdpdmVuX25hbWUiOiJWYXJ1biIsImZhbWlseV9uYW1lIjoiTWVuZHJlIiwiaWF0IjoxNzYxMDI2OTk2LCJleHAiOjE3NjEwMzA1OTZ9.fdkKgXpTLdJVdbFfMNTgNOc0ZoO08O9Rf83Q35tWEoUT_f8WZkf0d7LxEEpAKQqCVM_qwlb_K92LwIUBGNqGmFAvhko6enfXMU56kWlyi5nTZMVc-ZMa8A4LvT6GxlywGvWW3ccEQG2QWtjttC382nQArkWvqYqe2t8H46vcKe5V_VgPhWWiOgNm07zCI2avSmXWfkOriLapQ23jenAMfVIMzUhfOlYPCTcuggDxw3hmssUhEqvK1ndpPTMAI6ZKP8xPGvOg5uXAqfV9qqt19c5gu4J5ZH4f9PKOQAKRz5lVcg4Hp4yJWHtoHdFQ-9bsT-JFu3SCup7kE1XY1wPXLQ";

// const publicKey = `-----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAto2hcsFNHKquhCdUzXWd
// P8yxnGqxFWJlRT7sntBgp47HwxB9HFc+U/AB1JT8xe1hwDpWTheckoOfpLgo7/RO
// EsKpVJ/OXnotL/dgNwbprr+T/EFJV7qOEdHL0KmrnN+kFNLUUSqSChPYVh1aEjlP
// fXg92Yieaaz2AMMtiageZrKoYnrGC0z4yPNYFj21hO1x6mvGIjmpo6/fe91o+buZ
// NzzkmYlGsFxdvUxYAvgk+5+7D10UTTLGh8bUv/BQT3aRFiVRS5d07dyCJ4wowzxY
// lPSM6lnfUlvHTWyPL4JysMGeu+tbPA+5QvwCdSGpfWFQbgMq9NznBtWb99r1UStp
// BQIDAQAB
// -----END PUBLIC KEY-----`;

const client = new OAuth2Client();

// check in cahche the public key exits if not it will check its v3 enpoints check take from that and fetch data (in node_modules > googleauthlibrary > build > auth > oauth2client.js)
// BTS manages

//also compare audience if we mention out client ID
const loginTicket = await client.verifyIdToken({
  idToken: token,
  audience: clientId
});

console.log(loginTicket.getPayload());

// console.log(loginTicket);
// console.log(loginTicket.getAttributes());
// console.log(loginTicket.getUserId());