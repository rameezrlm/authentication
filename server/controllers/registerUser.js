const userModel = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const data = await userModel.findOne({ $or:[{username},{email}] });
  if (data) res.status(400).send("User Already Exist");
  else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ username, email, password:hashedPassword });
    console.log("User Created.. ", user);

    res.status(200).send(user);
  }
}

module.exports = registerUser;