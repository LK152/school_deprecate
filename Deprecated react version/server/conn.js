const admin = require('firebase-admin');
const serviceAccount = require('./lssh-self-learning-firebase-adminsdk-l3cvx-f010d6ac89.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

module.exports = admin;