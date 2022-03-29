import { createShortUrl } from "../controller"
import { UrlModel } from "../models/url"

const UrlServices = {
    checkIfShortUrlExists(urlCode: string) {
        return UrlModel.findOne({ urlCode })
    },

    createShortUrl(data: any) {
        let val = new UrlModel(data)
        val.save()
        return val
    },

    getUrl(code: any) {
        return UrlModel.findOne({ urlCode: code })
    },

    checkIfLongUrlExists(longUrl: string) {
        return UrlModel.findOne({ longUrl })
    }
}

export default UrlServices