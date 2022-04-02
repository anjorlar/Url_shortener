process.env.NODE_ENV = 'test'

import { ObjectId } from "mongodb";
import { UrlModel } from "../models/url"

const url = [
    {
        _id: new ObjectId(),
        urlCode: 'Q3tsvdh',
        shortUrl: `http://localhost:3610/Q3tsvdh`,
        longUrl: `https://www.typescriptlang.org`,
        date: `Mon Mar 28 2022 14:29:00 GMT+0100 (West Africa Standard Time)`
    },
    {
        _id: new ObjectId(),
        urlCode: 'Zt4Yio1',
        shortUrl: `http://localhost:3610/Zt4Yio1`,
        longUrl: `https://www.digitalocean.com/`,
        date: `Mon Mar 28 2022 16:29:00 GMT+0100 (West Africa Standard Time)`
    },
]

const seedUrl = async () => {
    try {
        await UrlModel.deleteMany({});
        const url1 = new UrlModel(url[0]);
        await url1.save()
        const url2 = new UrlModel(url[1]);
        await url2.save()
    } catch (error) {
        console.log("seeding error", error);
    }
}

export {
    url, seedUrl
}