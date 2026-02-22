const userModel = require("../models/User");
const bcrypt = require('bcrypt');
const logInUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({username});
  if(!user) {
    return res.status(404).json({error:"No User Registered!"});
  }
  const isPasswordValid = await bcrypt.compare(password,user.password);
  if(!isPasswordValid) {
    return res.status(401).json({error:"Invalid Password!"});
  }
  return res.status(200).json({success:"Logged in Successfully"});

};

module.exports = logInUser;
