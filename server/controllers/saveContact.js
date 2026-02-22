const userModel = require("../models/Contact");

const saveContact =async (req,res) => {
    const {name,phone,email} = req.body;
   const contact = await userModel.create({
        name,phone,email
    });
    res.send(contact);
}

module.exports = saveContact;