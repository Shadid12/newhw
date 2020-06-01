const express = require('express');
const {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument
} = require('../controllers/documents');

const router = express.Router();

router
  .route('/')
  .get(getDocuments)
  .post(createDocument);

router
  .route('/:id')
  .get(getDocument)
  .put(updateDocument)
  .delete(deleteDocument);

module.exports = router;