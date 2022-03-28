import { Router, Request, Response } from "express";
import * as urlShortnerController from "../controller/index"

const router = Router()

router.use("/health", (req: Request, res: Response) => {
    return res.status(200).json('Url Shortener Api is Up and Running')
})

router.post("/createUrlShortner", urlShortnerController.createShortUrl)
router.get("/:code", urlShortnerController.redirectsToLongUrl)

export default router