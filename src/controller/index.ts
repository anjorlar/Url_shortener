import { nanoid } from "nanoid"
import validUrl from "valid-url"
import { Response, Request } from "express"
import { config } from "../config/config"
import UrlServices from "../services/index"





/**
 * @description creates short url
 * @param req 
 * @param res 
 */
export async function createShortUrl(req: Request, res: Response) {
    try {
        const { longUrl } = req.body
        const baseUrl = config.baseUrl
        if (!longUrl) {
            return res.status(401).json('Please Pass the longUrl')
        }
        //checks base url
        if (!validUrl.isUri(baseUrl)) {
            return res.status(401).json('Invalid base url')
        }

        // creates url code
        let urlCode = nanoid(7)
        // check long url
        if (validUrl.isUri(longUrl)) {

            // checks if short url code exists
            let url1 = await UrlServices.checkIfShortUrlExists(urlCode)
            let longUrl1 = await UrlServices.checkIfLongUrlExists(longUrl)
            if (longUrl1) {
                return res.status(409).json({
                    message: 'long url already exist',
                    url: longUrl
                })
            } else if (url1) {
                //retries generating a url code again
                urlCode = nanoid(7)
                let url2 = await UrlServices.checkIfShortUrlExists(urlCode)
                if (url2) {
                    return res.status(401).json('Could generated a short url')
                } else {
                    const shortUrl = baseUrl + '/' + urlCode;
                    const data = {
                        longUrl,
                        shortUrl,
                        urlCode,
                        date: new Date()
                    };
                    const createdVal = await UrlServices.createShortUrl(data)
                    return res.status(201).json(createdVal);
                }
            } else {
                const shortUrl = baseUrl + '/' + urlCode;
                const data = {
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                };
                const createdVal = await UrlServices.createShortUrl(data)
                return res.status(201).json(createdVal);
            }
        } else {
            return res.status(401).json('Invalid long url');
        }
    } catch (error) {
        // console.log('>>>> error', error)
        return res.status(500).json('Internal server error')
    }
};

/**
 * @description Redirect to long/original URL
 * @param req 
 * @param res 
 */
export async function redirectsToLongUrl(req: Request, res: Response) {
    try {
        const { code } = req.params
        // console.log(">>>>>> typeof code", typeof code)
        const url = await UrlServices.getUrl(code.toString())
        // console.log(">>>>>> url", url)
        if (url) {
            return res.status(200).redirect(url.longUrl)
        } else {
            return res.status(404).json('No url found');
        }
    } catch (error) {
        // console.error('>>>', error);
        return res.status(500).json('Internal Server error');
    }
}