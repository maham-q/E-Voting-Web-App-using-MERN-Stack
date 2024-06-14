const bcrypt= require ('bcrypt')
const jwt = require('jsonwebtoken')
const Auth = require('../models/auth')
const AppError = require('../../src/utils/appError');
const promisify = require('promisify');

//helper function
const login = async (username, password) => {
  try {
    const user = await Auth.findOne({ username });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      'your-secret-key',
      { expiresIn: '1h' }
    );
    return token;
  } catch (error) {
    throw error;
  }
};
const authController = {
  //Done
  register : async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
  
      // Checking if any required field is missing
      if (!username || !password || !email) {
        return res.status(400).json({ message: 'Incomplete Credentials' });
      }
      // Checking if username or email already exists
      const existingUser = await Auth.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(409).json({ message: 'Username or email already exists' });
      }
      // Hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Creating a new user
      const newUser = new Auth({
        username,
        email,
        password: hashedPassword
      });
      // Entering user in the mongodb
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error registering user' });
    }
  },
  //Done
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const token = await login(username, password);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Login Failed' });
    }
  },
  protect : async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    // 3) Check if user still exists
    const currentUser = await Auth.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  }
};


module.exports= authController;