module.exports = (req, res, next) => { //'next' -> passes the request to the next middleware if user is logged in
    if (req.user.credits < 1) {
        return res.status(402).send({ error: 'Not enough credits!' });
    }

    next(); //if user is logged in, continue to the next middleware or route handler
};