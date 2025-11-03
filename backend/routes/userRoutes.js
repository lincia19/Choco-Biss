const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        addresses: user.addresses
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, phone, avatar },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        addresses: user.addresses
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add address
router.post('/address', protect, async (req, res) => {
  try {
    const { name, address, locality, house, pincode, district, state, isDefault } = req.body;
    
    const user = await User.findById(req.userId);
    
    const newAddress = {
      name,
      address,
      locality,
      house,
      pincode,
      district,
      state,
      isDefault: isDefault || false
    };

    // If this is set as default, remove default from other addresses
    if (isDefault) {
      user.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    user.addresses.push(newAddress);
    await user.save();

    res.json({
      message: 'Address added successfully',
      addresses: user.addresses
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update address
router.put('/address/:addressId', protect, async (req, res) => {
  try {
    const { name, address, locality, house, pincode, district, state, isDefault } = req.body;
    
    const user = await User.findById(req.userId);
    const addressIndex = user.addresses.id(req.params.addressId);
    
    if (!addressIndex) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Update address fields
    addressIndex.name = name;
    addressIndex.address = address;
    addressIndex.locality = locality;
    addressIndex.house = house;
    addressIndex.pincode = pincode;
    addressIndex.district = district;
    addressIndex.state = state;
    addressIndex.isDefault = isDefault || false;

    // If this is set as default, remove default from other addresses
    if (isDefault) {
      user.addresses.forEach(addr => {
        if (addr._id.toString() !== req.params.addressId) {
          addr.isDefault = false;
        }
      });
    }

    await user.save();

    res.json({
      message: 'Address updated successfully',
      addresses: user.addresses
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete address
router.delete('/address/:addressId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.addresses.pull(req.params.addressId);
    await user.save();

    res.json({
      message: 'Address deleted successfully',
      addresses: user.addresses
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;