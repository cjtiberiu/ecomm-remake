
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "ecommerce-11ec7",
    "private_key_id": process.env.FIREBAE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": "firebase-adminsdk-wbaxe@ecommerce-11ec7.iam.gserviceaccount.com",
    "client_id": "104805968189402951718",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wbaxe%40ecommerce-11ec7.iam.gserviceaccount.com"
  })
});

module.exports = admin;