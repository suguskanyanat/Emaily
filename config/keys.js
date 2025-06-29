if (process.env.NODE_ENV === 'production') {
    //in production -> return the prod set of keys
    module.exports = require('./prod')
} else {
    //in development -> return the dev keys
    module.exports = require('./dev');
}

//keys.js - figure out waht set of credentials to return