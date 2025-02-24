import { Router } from "express";

export const wordRouter = Router();

// DB 
const words = ["hello", "world", "node", "express"];

wordRouter.param("word", (req, res, next, word) => {
    if (!/[a-zA-Z]+/.test(word)) {
        return res.status(400).json({ error: "invalid word" }); 
    }

const searchWord = words.find((w) => w===word);
if (!searchWord) {
    return res.status(404).json({ error: "word not found" });
}
next();

}); 

wordRouter.get("/:word([A-Z%C3%A1Aa-z]+)", (req, res) => {
    const { word } = req.params;
    res.json({ word });
});
