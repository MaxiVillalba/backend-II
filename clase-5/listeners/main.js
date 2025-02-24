process.on("exit", (code) => {
    console.log(`The process has exited with de following code: ${code}`)
});

process.on("uncaughtException", (error) => {
    console.error(`An error ocurred: ${error.message}`);
    })


    process.on("message", (message) => {
        console.log(`The following message was received from the parent process: ${message}`);
    });
