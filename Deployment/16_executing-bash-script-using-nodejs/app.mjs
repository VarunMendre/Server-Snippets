import { spawn } from "child_process";

const bashChildProcess = spawn('bash', ["script.sh"]);

bashChildProcess.stdout.on("data", (data) => {
    process.stdout.write(data);
});

bashChildProcess.on("close", code => {
    if (!code) {
        console.log(`We get exit code as : ${code}`);
        console.log("Script executed Successfully");
    } else {
        console.log("Script failed..");
    }
})

bashChildProcess.stderr.on("data", (data) => {
    process.stderr.write(data);
})

bashChildProcess.on("error", (err) => {
    console.log("error while swapping the process");
    console.log(err);
})









