import user from "../models/userModel.js";

//getting All users
export const getUsers = async (req, res) => {
    try {
        const response = await user.find({});
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
}

//Getting user details
export const getUserById = async (req, res) => {
    try {
        const userId = req.id;

        const response = await user.findOne({ _id: userId });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
}

//Updating user
export const updateUserById = async (req, res) => {
    try {
        const userId = req.id;
        const newData = req.body;
        const response = await user.findByIdAndUpdate({ userId, newData });
        res.status(201).send(`Data updated ${response.data} `);
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
}

//Deleting user
export const deleteUserById = async (req, res) => {
    try {
        const userId = req.id;
        const response = await user.findByIdAndDelete({ userId, newData });
        res.status(200).send(`user deleted ${response.data}`);
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
}