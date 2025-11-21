import multer from "multer"


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public") //file to keep image
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname) // name of the file
    }
})

export const upload = multer({ storage })