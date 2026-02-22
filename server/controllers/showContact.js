const userModel = require("../models/Contact");

const showContact =async (req,res) => {
    const contact = await userModel.find();
    console.log(contact);
    res.send(contact);
}

module.exports = showContact;