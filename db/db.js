import mongoose from "mongoose";

class DB {
    constructor() {
        const HOST = process.env.DB_HOST;
        const PORT = process.env.DB_PORT;
        const DB_NAME = process.env.DB_NAME;
        mongoose.connect(`mongodb://${HOST}:${PORT}/${DB_NAME}`).then(() => {
            console.log("Database connected");
        }).catch(() => {
            console.log("Error connecting to database");
        });
    }
}

export default DB;
