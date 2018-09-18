import sourceMapSupport from 'source-map-support'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import process from 'process';
import express from "express";

sourceMapSupport.install();
dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req: any, res: any) => {
    throw new Error('123');
    res.send('Hello world')
});

app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'),
        app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

module.exports = app;