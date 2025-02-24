import { config } from "dotenv";

config();

export const CONFIG = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost/contacts",
};
