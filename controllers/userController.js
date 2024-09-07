import user from "../models/userModel.js";


export const getUsers = async (req, res) => {
    try {
        const response = await user.find({});
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
}


export const createUser = async (req, res) => {
    try {
        const newData = req.body;
        await user.insertMany(newData)
            .then(res => res.status(201).send(`Data created ${res} `))
            .catch(error => res.status(409).send(`Error while create data: ${error}`))
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
}

export const getUserById = async (req, res) => {
    try {
        const userId = req.id;
        const response = await user.findOne({ _id: userId });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
}

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

export const deleteUserById = async (req, res) => {
    try {
        const userId = req.id;
        const response = await user.findByIdAndDelete({ userId, newData });
        res.status(200).send(`user deleted ${response.data}`);
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
}