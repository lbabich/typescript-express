import express from 'express';
import 'source-map-support/register'
import sourceMapSupport from 'source-map-support'
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import {fileLoader} from '@Config/configLoader';
sourceMapSupport.install();

dotenv.config();

const app = express();

async function dynamicImport() {
    const data = fileLoader();
    const jsFile = await import('./testFile') as any;

    data.catch((err: any) => {
        console.log('>>>>>>>');
        console.log(err);
        console.log('>>>>>>>');
    });

    return {
        data,
        jsFile
    };
}

dynamicImport().then(data => {
    console.log(data);
    console.log(data.jsFile.testFunc());
});

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'),
        app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

module.exports = app;
