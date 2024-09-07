import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
    const { cookies } = req;
    //Verifing cookie
    if (cookies.accessToken) {
        let user = jwt.verify(cookies.accessToken, process.env.SECRET_KEY);//Decryption
        req.id = user._id;

        if (!req.id) {
            return res.status(401).send({ message: `Not Autherized` });
        }
        return next();
    }
    res.status(401).send({ message: `Not Autherized` });
}