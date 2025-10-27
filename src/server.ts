/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { Server } from "http";
import { adminController } from "./app/modules/admin/admin.controller";

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)
        console.log("Connect To DB");

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is running on port ${envVars.PORT}`);
        })
    } catch (err) {
        console.log(err);
    }
}


(async() => {
  await startServer();
await  adminController.setConfig()
  
})()