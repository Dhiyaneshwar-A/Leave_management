const admin = require('firebase-admin');
var {storage} = require('@google-cloud/storage');
const serviceAccount = require('F:\\Hack_fest\\Notesmgmt\\learning.json'); // Replace with your own service account key
const gaxios = require('gaxios');
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://learning-management-syst-940c7.appspot.com',
});

storage = admin.storage();

// Replace 'path/to/your/image.jpg' with the actual path to your image in Firebase Storage.
const imagePath = 'images/21IT081_RESUME.pdf';

// Get a reference to the storage bucket
const bucket = storage.bucket();

// Create a reference to the image file
const file = bucket.file(imagePath);

// Download the image to a local file
const localFilePath = 'F:\\Hack_fest\\Notesmgmt\\download\\21IT081_RESUME.pdf';

file.download({ destination: localFilePath })
  .then(() => {
    console.log('Image downloaded successfully to', localFilePath);
  })
  .catch((error) => {
    console.error('Error downloading image:', error);
  });
