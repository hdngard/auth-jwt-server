import User from './../../model/userModel.js';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../../helpers/generateToken.js';

// @desc    Register user
// @route   POST api/users
// @access  Public

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const isHaveUser = await User.findOne({ email: email });

  if (isHaveUser) {
    res.status(400);
    throw Error('Такой пользователь уже существует');
  }

  const user = await User.create({
    email,
    password,
  });

  const token = generateToken(user._id);

  res.json({ user, token });
});
