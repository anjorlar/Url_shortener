/**
 * Set's up mongodb connection with mongoose
 */


import mongoose from "mongoose"
import { config } from "./config";
//  import { logger } from "../utils/logger"

const uri = config.environment === "test" ?
    config.mongoDb.testUri : config.mongoDb.uri

export const connectMongoDb = async () => {
    try {
        await mongoose.connect(uri, {
        });
        console.log(`Mongo Db connected`)
    } catch (error) {
        console.error("connecting to mongo db", error)
        process.exit(1)
    }
}