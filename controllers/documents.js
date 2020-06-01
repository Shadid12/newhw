const Document = require('../models/Document');

// @desc      Get all documents
// @route     GET /api/v1/documents
// @access    Public
exports.getDocuments = async (req, res, next) => {
    try {
        const documents = await Document.find();
    
        res
          .status(200)
          .json({ success: true, count: documents.length, data: documents });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};
  
// @desc      Get single document
// @route     GET /api/v1/documents/:id
// @access    Public
exports.getDocument = async (req, res, next) => {
    try {
        const document = await Document.findById(req.params.id);
    
        if (!document) {
          return res.status(400).json({ success: false });
        }
    
        res.status(200).json({ success: true, data: document });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};
  
// @desc      Create new document
// @route     POST /api/v1/documents
// @access    Private
exports.createDocument = async (req, res, next) => {
    try {
        const document = await Document.create(req.body);
    
        res.status(201).json({
          success: true,
          data: document
        });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc      Update document
// @route     PUT /api/v1/documents/:id
// @access    Private
exports.updateDocument = async (req, res, next) => {
    try {
        const document = await Document.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
    
        if (!document) {
          return res.status(400).json({ success: false });
        }
    
        res.status(200).json({ success: true, data: document });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};
  
// @desc      Delete document
// @route     DELETE /api/v1/documents/:id
// @access    Private
exports.deleteDocument = async (req, res, next) => {
    try {
        const document = await Document.findByIdAndDelete(req.params.id);
    
        if (!document) {
          return res.status(400).json({ success: false });
        }
    
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};