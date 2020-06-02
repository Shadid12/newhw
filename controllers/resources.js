const Resource = require('../models/Resource');

// @desc      Get all resources
// @route     GET /api/v1/resources
// @access    Public
exports.getResources = async (req, res, next) => {
    try {
        const resources = await Resource.find();
    
        res
          .status(200)
          .json({ success: true, count: resources.length, data: resources });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};
  
// @desc      Get single Resource
// @route     GET /api/v1/resources/:id
// @access    Public
exports.getResource = async (req, res, next) => {
    try {
        const resource = await Resource.findById(req.params.id);
    
        if (!resource) {
          return res.status(400).json({ success: false });
        }
    
        res.status(200).json({ success: true, data: resource });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};
  
// @desc      Create new Resource
// @route     POST /api/v1/resources
// @access    Private
exports.createResource = async (req, res, next) => {
    try {
        const resource = await Resource.create(req.body);
    
        res.status(201).json({
          success: true,
          data: resource
        });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

// @desc      Update Resource
// @route     PUT /api/v1/resources/:id
// @access    Private
exports.updateResource = async (req, res, next) => {
    try {
        const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
    
        if (!resource) {
          return res.status(400).json({ success: false });
        }
    
        res.status(200).json({ success: true, data: resource });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};
  
// @desc      Delete Resource
// @route     DELETE /api/v1/resources/:id
// @access    Private
exports.deleteResource = async (req, res, next) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);
    
        if (!resource) {
          return res.status(400).json({ success: false });
        }
    
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc      Delete Resource
// @route     D /api/v1/resources/download/:id
// @access    Private
exports.downloadResource = async (req, res, next) => {
    try {
        const resource = await Resource.findById(req.params.id);
    
        if (!resource) {
          return res.status(400).json({ success: false });
        }
        let file = `./uploads/${resource.body}`
        res.download(file);
    } catch (err) {
        res.status(400).json({ success: false });
    }
}