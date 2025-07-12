const User = require('../models/User');
const Swap = require('../models/Swap');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

exports.upload = upload;

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Update fields
    user.name = req.body.name || user.name;
    user.location = req.body.location || user.location;
    user.skillsOffered = req.body.skillsOffered ? 
      req.body.skillsOffered.split(',').map(skill => skill.trim()) : 
      user.skillsOffered;
    user.skillsWanted = req.body.skillsWanted ? 
      req.body.skillsWanted.split(',').map(skill => skill.trim()) : 
      user.skillsWanted;
    user.availability = req.body.availability || user.availability;
    user.profileType = req.body.profileType || user.profileType;
    
    // Update profile photo if uploaded
    if (req.file) {
      // Delete old profile photo if exists
      if (user.profilePhoto && fs.existsSync(user.profilePhoto)) {
        fs.unlinkSync(user.profilePhoto);
      }
      user.profilePhoto = req.file.path;
    }
    
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { skill } = req.query;
    const users = await User.find({
      $or: [
        { skillsOffered: { $regex: skill, $options: 'i' } },
        { skillsWanted: { $regex: skill, $options: 'i' } }
      ],
      profileType: 'public',
      isBanned: false,
      _id: { $ne: req.user.id } // Exclude current user
    }).select('name location profilePhoto skillsOffered skillsWanted availability');
    
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
