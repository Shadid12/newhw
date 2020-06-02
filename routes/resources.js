const express = require('express');
const {
  getResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
  downloadResource
} = require('../controllers/resources');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    req.body.body = Date.now() + '-' + file.originalname;
    req.body.mimeType = file.mimetype
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage });
//

const router = express.Router();

router
  .route('/')
  .get(getResources)
  .post(upload.single('resourceFile'),createResource);

router
  .route('/:id')
  .get(getResource)
  .put(updateResource)
  .delete(deleteResource);

router
  .route('/download/:id')
  .get(downloadResource)

module.exports = router;