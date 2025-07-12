const path = require('path');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    console.log('Register request body:', req.body);
    console.log('Register request file:', req.file);
    // If file uploaded, set profilePhoto path
    if (req.file) {
      req.body.profilePhoto = path.join('uploads/profilePhotos', req.file.filename);
    }
    // Parse skillsOffered and skillsWanted if they are strings
    if (typeof req.body.skillsOffered === 'string') {
      req.body.skillsOffered = req.body.skillsOffered.split(',').map(s => s.trim());
    }
    if (typeof req.body.skillsWanted === 'string') {
      req.body.skillsWanted = req.body.skillsWanted.split(',').map(s => s.trim());
    }
    console.log('Processed register data:', req.body);
    const user = new User(req.body);
    await user.save();
    console.log('User saved successfully:', user);

    const token = await user.generateAuthToken();

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        isAdmin: user.isAdmin
      },
      token
    });
  } catch (err) {
    console.error('Register error:', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    if (user.isBanned) {
      return res.status(403).json({ error: 'Account has been banned' });
    }
    
    const token = await user.generateAuthToken();
    
    res.json({ 
      user: { 
        _id: user._id, 
        name: user.name, 
        email: user.email,
        profilePhoto: user.profilePhoto,
        isAdmin: user.isAdmin
      }, 
      token 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
