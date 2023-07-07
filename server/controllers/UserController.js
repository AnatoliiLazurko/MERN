const UserModel = require("../models/UserModel")

const getUsers = async (req, res) => {
    const users = await UserModel.find({});
    return res.json(users);
}

module.exports = { getUsers };