import 'module-alias/register';
import 'source-map-support/register';
import sourceMapSupport from 'source-map-support';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import process from 'process';

const express = require('express');
// import {fileLoader} from './util/configLoader';

dotenv.config();
sourceMapSupport.install();

// process.chdir('./src');
// if (process.env.ENVIRONMENT_TYPE === 'development') {
//     process.chdir('./src');
// } else {
//     process.chdir('./dist/platformLocator');
// }

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req: any, res: any) => {
    res.send('Hello Luke')
});

app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'),
        app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

module.exports = app;

// dynamicImport()
//     .then(data => {
//         console.log(data);
//         console.log(data.jsFile.testFunc());
//     });

// async function dynamicImport() {
//     const data = fileLoader();
//     const jsFile = await import('./testFile') as any;
//
//     data.catch((err: any) => {
//         console.log('>>>>>>>');
//         console.log(err);
//         console.log('>>>>>>>');
//     });
//
//     return {
//         data,
//         jsFile
//     };
// }