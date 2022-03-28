import { Document, model, Model, Schema } from "mongoose"
import { config } from "../config/config"

export interface UrlDoc extends Document {
    urlCode: string,
    longUrl: string,
    shortUrl: string,
    date: string
}

const urlSchema = new Schema({
    urlCode: {
        type: String,
        unique: true
    },
    longUrl: {
        type: String,
    },
    shortUrl: {
        type: String,
        unique: true
    },
    date: {
        type: String,
        default: Date.now
    }
})

urlSchema.methods.toJSON = function () {
    const obj = this.toObject();
    // delete obj._id; 
    return obj;
};

export const UrlModel: Model<UrlDoc> = model<UrlDoc>(config.mongoDb.collections.url,
    urlSchema)