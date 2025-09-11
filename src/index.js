import {app} from "./app.js"
import connectDB from "./db/db.js";
import dotenv from "dotenv";
dotenv.config({
    path: "../.env"
})
connectDB()
.then( () => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running at ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO DB failed !!", err);
    
})