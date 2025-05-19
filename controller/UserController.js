const User = require('../models/User');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, age, password, nationality } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    if (!name || !email || !age || !password || !nationality) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newUser = new User({ name, email, age, password, nationality, profileImage });
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Create user error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all users
const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    console.log('Fetched users:', users);
    return res.status(200).json(users);
  } catch (error) {
    console.error('Fetch users error:', error);
    return res.status(500).json({ message: 'Error fetching users' });
  }
};

// Get user by ID
const getuserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Fetch user by ID error:', error);
    return res.status(500).json({ message: 'Error fetching user' });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.profileImage = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated user:', updatedUser);
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.cookie('session_user', email, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: 'strict',
    });

    return res.status(200).send('Login successful. Cookie set');
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createUser,
  getAllUser,
  getuserById,
  updateUser,
  loginUser,
};
