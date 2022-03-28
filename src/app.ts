import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes"

// imported modules
import { config } from "./config/config"
import { connectMongoDb } from "./config/mongoose"
import BaseRoute from "./routes/index"

// Init express
const app: Application = express();

//connects DB
connectMongoDb()

app.disable("x-powered-by");

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Route
app.use(BaseRoute)
// app.use("/api/v1", BaseRoute)

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        githuburl: `https://github.com/anjorlar/Url_shortener.git`,
        message: `Welcome to a Url Shortener Api`
    });
});

//handle error
app.all("/*", (req: Request, res: Response) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        message: `${StatusCodes.NOT_FOUND} -  Not found`,
    })
})

app.use((err: any, req: Request, res: Response) => {
    console.log(err.stack)
    console.error(err.stack)
    return res.status(err.stack || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
    })
})

export { app }