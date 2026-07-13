const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        // get token
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({
                success: false,
                message: 'Authorization token missing or invalid'
            });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success:false,
                    message:"Unauthorized User"
                });
            } else {
                req.user = { id: decode.id };
                next();
            }
        });

    } catch(error) {
        console.error(error);
        return res.status(500).send({
            success:false,
            message:"Please provide auth token!",
            error
        });
    }
};
