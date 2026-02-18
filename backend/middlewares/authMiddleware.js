import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Please log in before" })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_TOKEN);
        req.body.userID = token_decode.id;
        next();

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong.Try later" })
    }
}

export {authMiddleware} ;