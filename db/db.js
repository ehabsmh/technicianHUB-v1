import mongoose from "mongoose";
import User from '../models/users.js';

class DB {
    constructor() {
        this._connect();
    }

    async _connect() {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/technicianHUB');
            console.log("Database connected");
        } catch {
            console.log("Error connecting to database");
        }
    }
}

export default DB;
