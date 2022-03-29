import dotenv from "dotenv";
dotenv.config();


interface IEnv {
    appName: string;
    baseUrl: string;
    port: Number;
    mongoDb: IMongoDb;
    environment: string;
}

interface IMongoDb {
    uri: string;
    testUri: string;
    collections: ICollections
}

interface ICollections {
    url: string;
}

const config: IEnv = {
    appName: 'Url Shortener',
    baseUrl: process.env.BASE_URL!,
    environment: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT),
    mongoDb: {
        uri: process.env.MONGODB_URI!,
        testUri: process.env.MONGODB_TEST_URI!,
        collections: {
            url: "Url",
        },
    },
}
export { config }
