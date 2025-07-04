module.exports = (req, res, next) => { //'next' -> passes the request to the next middleware if user is logged in
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!' });
    }

    next(); //if user is logged in, continue to the next middleware or route handler
};