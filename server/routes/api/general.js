const controller = require('../../controllers/general.controller');
const { validateToken } = require('../../middlewares/auth');
const path = require('path');
var multer = require('multer');
const moment = require('moment');
const { resolve } = require('../../lib/http');

let photoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, 'image' + '_' + Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({
  storage: photoStorage,
});

/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "file". **/
var type = upload.single('file');

module.exports = (app) => {
  app.post('/image-upload', type, resolve(controller.imageUpload));
  app.get('/', (req, res) => {
    const date = moment().add(1, 'days').format();

    const then = moment(date).format('DD MM YYYY hh:mm:ss');
    res.send({ hello: 'world', date, then });
  });
};
