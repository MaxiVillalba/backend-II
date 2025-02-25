import express from "express";

import { CONFIG } from "./config/config.js";
import { fork } from "child_process";
import { complexOp } from "./utils/complex-op.js";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/complex-op", (req, res) => {
    const result = complexOp();
    res.json(result);
});

app.get("/op-non-blocking", (req, res) => {
    const child = fork("./src/utils/child-process.js");
    child.send("complex-op");

    child.on("message", (message) => {
        res.json(message);
    });
});

app.get("/config", (req, res) => {
    res.json(CONFIG);
});

app.listen(CONFIG.PORT, () => {
    console.log(`🚀 Server listening on port ${CONFIG.PORT}`);
});
