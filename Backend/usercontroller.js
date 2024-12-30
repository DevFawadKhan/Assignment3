const User = require('./usermodel.js')
const jwt = require('jsonwebtoken');
const JWT_SECRET = '123@#';

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }  // Token expiry time set to 1 hour
    );
  };
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// Controller function for user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
      // Find user by email
      const user = await User.findOne({ email });
      // Check if user exists
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  // Generate token
  const token = generateToken(user);
      // Send success response with user details (excluding password)
      res.status(200).json({
        message: 'Login successful',
        token,
        expiresIn: '1 hour',  // Indicating that the token will expire in 1 hour
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
module.exports = { registerUser,loginUser};




