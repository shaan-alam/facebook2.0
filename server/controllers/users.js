const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!!" });
  }
};

const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do no match!!" });

  try {
    // Check for existing User
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: "Email already exists!! " });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = await new User({
      email,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
    });

    await newUser.save();

    const profileObj = {
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    };

    // Create a token
    const tokenId = jwt.sign({ id: newUser._id }, "secret");

    res.json({ profileObj, tokenId });
  } catch (err) {
    console.log(err);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({ message: "User doesn't exists!! " });
  }

  try {
    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password!! " });
    }

    // If everything is OK
    const tokenId = await jwt.sign({ id: existingUser._id }, "secret");

    const profileObj = {
      _id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
    };

    res.json({ profileObj, tokenId });
  } catch (err) {
    res.json(err);
  }
};

const signUpWithGoogle = async (req, res) => {
  // Get the data from the front end
  const { name, email, password, confirmPassword } = req.body;

  // Check if already a user exists with that email
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    // Create a new user with these name and email, and return the new user along with the token

    // If the password & confirm password do not match
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: "The two passwords do not match!" });

    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await new User({ name, email, password: hashedPassword });

      // Save the user, generate a token and return it to the front-end
      await newUser.save();

      const token = await jwt.sign({ id: newUser._id }, "secret");

      res.json({ user: newUser, token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res
      .status(400)
      .json({ message: "An account already exists with that email..." });
  }
};

const signInWithGoogle = async (req, res) => {
  const { email } = req.body;

  // Check if a user already exists with that email
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "No user registered with that email!" });
  }

  const token = await jwt.sign({ id: existingUser._id }, "secret");

  // If the user exists, then send the user along with the token
  res.json({ user: existingUser, token });
};

module.exports = {
  getUser,
  signin,
  signup,
  signUpWithGoogle,
  signInWithGoogle,
};
