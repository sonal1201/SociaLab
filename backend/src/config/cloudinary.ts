import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

const uploadOnCloudinary = async (file: any) => {

    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_APIKEY,
            api_secret: process.env.CLOUD_SECRET
        });

        const res = await cloudinary.uploader
            .upload(file, { resource_type: "auto" })

        fs.unlinkSync(file)

        return res.secure_url
    } catch (error) {
        console.log(error)
        fs.unlinkSync(file)
    }

}

export default uploadOnCloudinary