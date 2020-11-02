import express from 'express';
import path from 'path';
import devBundle from './devBundle';
import template from './../template';
import { MongoClient } from 'mongodb';

let port = process.env.PORT || 3000;
const app = express();
devBundle.compile(app)

const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.get('/', (req, res) => {
    res.status(200).send(template())
})



app.listen(port, function onStart(err) {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', port)
})

//Database Connection url

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolioDb'

//Use connect method to connect to the server
MongoClient.connect(url, (err, db) => {
    if(err)return process.exit(1)
    console.log("Conneccted successful to mongodb server")
    db.close()
})