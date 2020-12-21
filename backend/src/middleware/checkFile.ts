import multer from 'multer'
import { Request } from 'express'

const imageFilter = (req: Request, file?: any, cb?: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        cb(({ error: 'Only image files are allowed' }), false);
    }
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
})

const upload = multer({ storage, fileFilter: imageFilter })
export default upload.single('avatar');