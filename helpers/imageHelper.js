const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('image extension must be jpeg or png'), false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: 1024 * 1024 * 5 // max size (5m)
})

module.exports = upload