import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";
import Tokens from "../models/tokenModel.js";
import { sendMail } from "../utils/sendEmail.js";

//Regisration
export const register = async (req, res, next) => {
    try {
        const payload = req.body;

        if (!payload.password) {
            return res.status(400).send(`password is mandatory!`);
        }
        //Hashing the password
        const hashedValue = await bcrypt.hash(payload.password, 12);
        payload.hashedPassword = hashedValue;
        delete payload.password;

        //validating the dataa
        const newUser = new Users(payload);

        //registering the new user
        newUser.save().then(data => res.status(200).send(`user ${data.name} registered successfully`))
            .catch(error => res.status(400).send(`Error while registring user: ${error}`));
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
}

//Signin
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Email present or not
        if (email !== '') {
            //user exists or not
            const existingUser = await Users.findOne({ email: email });
            if (existingUser) {
                //if exists validate password
                const isValideUser = await bcrypt.compare(password, existingUser.hashedPassword);
                if (isValideUser) {
                    //if true login -> using jwt - cookies(1day value)
                    const token = jwt.sign({ _id: existingUser._id }, process.env.SECRET_KEY);
                    res.cookie("accessToken", token, { expire: new Date() + 8640000000 });

                    return res.status(201).send({ message: `User signed-in successful` });
                }
                //else false error
                return res.status(400).send({ message: `Invalid credentials.` })
            }
            return res.status(404).send({ message: `user doesn't exist.` })
        }
        return res.status(400).send({ message: `Enter the required details` })
    } catch (error) {
        res.status(500).send({ message: `Internal server error: ${error}` });
    }
}

//Signout
export const signout = async (req, res) => {
    try {
        await res.clearCookie("accessToken");
        res.status(200).send({ message: `signed-out successfully` });
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
}

//ForgotPassword
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        //Requesting email
        if (!email) {
            return res.status(400).send({ message: `Email is mandatory` });
        }

        const user = await Users.findOne({ email: email });
        //Checking email present or not
        if (!user) {
            return res.status(400).send({ message: `user doesn't exist. You can register` });
        }

        const token = await Tokens.findOne({ userId: user._id });

        if (token) {
            await token.deleteOne();
        }
        //Generating token
        const newToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        //Hashing the token
        const hashedToken = await bcrypt.hash(newToken, 10);

        const tokenPayload = new Tokens({ userId: user._id, token: hashedToken, createdAt: Date.now() });
        await tokenPayload.save();

        //Creating link
        const link = `http://localhost:3000/resetPassword?token=${newToken}&id=${user._id}`;

        //Sending link to the Email
        await sendMail(user.email, "Reset password link", { name: user.name, link: link });
        return res.status(200).send({ message: `Email sent successfully . Link: ${link}` });

    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
}
//Reseting Password
export const resetPassword = async (req, res) => {
    try {
        const { userId, token, newPassword } = req.body;
        //Checking userId present in Tokens data
        const resetToken = await Tokens.findOne({ userId });
        if (!resetToken) {
            return res.status(400).send({ message: "Invalid or expired token." });
        }
        //Validating Token
        const isValid = bcrypt.compare(token, resetToken.token);

        if (!isValid) {
            return res.status(400).send({ message: 'Invalid token.' });
        }
        //Hashing new Password
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        //Upadating new password
        Users.findByIdAndUpdate({ _id: userId }, { $set: { hashedPassword } }).catch(error => {
            res.status(400).send({ message: 'Error while updating user password.', Error: error });
        })
        //Deleting TOKEN data after reset
        await resetToken.deleteOne();
        return res.status(200).send({ message: 'Reset Password is successful.' });

    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
}