
const configs = {
    secretKey: '12345-43215-51423-12345-09683',
    mongoUrl: 'mongodb://mongo:27017/conFusion',
    mongoOpts: {},
    sessionOpts: {
        name: 'session-id',
        secret: this.secretKey,
        saveUninitialized: false,
        resave: false
    },
    authOpts: {
        passthrough: [ '/', '/users/login', '/users/signup' ]
    }
};

module.exports = configs;
