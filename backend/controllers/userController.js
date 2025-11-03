// controllers/userController.js
exports.getUserProfile = async (req, res) => {
  try {
    res.json({ message: 'User profile' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    res.json({ message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};