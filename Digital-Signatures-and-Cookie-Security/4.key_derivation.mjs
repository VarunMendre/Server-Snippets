import crypto from 'node:crypto';

// Using salt as random.UUID()

// const mySalt = crypto.randomUUID();
// crypto.pbkdf2('password', mySalt, 100000, 32, "SHA-256", (err, output) => {
//     console.log(output.toString('base64url'));
// });


// Using salt as .randomBytes()

const a = crypto.randomBytes(16);
crypto.pbkdf2('password', a, 100000, 32, "SHA-256", (err, output) => {
    console.log(output.toString('base64url'));
});


