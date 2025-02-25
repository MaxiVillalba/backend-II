import { complexOp } from "./complex-op.js";

process.on("message", (message) => {
    console.log(`Process initialized with el folowwing PID: ${process.pid}`)

    // switch (message) {
    // case "complex-op": {} break; 

    const result = complexOp();

    process.send(result);
})