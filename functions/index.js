const functions = require('firebase-functions');
const Insta = require('./insta.js')
const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors({ origin: '*' }));

app.options('/posts/images/:instaPath', cors()) // enable pre-flight request for DELETE request
app.get('/posts/images/:instaPath', cors(), function (req, res, next) {
    if(req.params.instaPath){
        return new Insta(req.params.instaPath).findPostImages().then((result)=> {
            res.json(result);
        });
        
    }else{
        res.json({result:'error', message: 'please provide instaPath variable'});
    }
  
})

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);