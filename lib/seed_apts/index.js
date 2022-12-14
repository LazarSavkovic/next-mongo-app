// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config()
// }


import path from 'path';
import mongoose from "mongoose"
import Apt from "../../models/Apt"
import apartments from "./apartments.json"

export default async function seedApts(){

    const dbUrl = process.env.MONGO_URL;

    console.log(dbUrl)
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", () => {
        console.log("Database connected")
    })
    
    
    
    const seedDB = async function () {
        await Apt.deleteMany({});
        await Apt.insertMany(apartments);
    };
    
    seedDB().then(() => {
        db.close();
    })
}
