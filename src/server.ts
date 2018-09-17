import express from 'express';
import 'source-map-support/register'
import * as sourceMapSupport from 'source-map-support'
import webpack from 'webpack';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import {fileLoader} from '@Config/configLoader';

sourceMapSupport.install();
dotenv.config();
const compiler = webpack(webpackConfig);
const app = express();

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.path,
        stats: {colors: true}
    })
);

app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'),
        app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

if (process.env.NODE_ENV === 'dev') {
    if ((module as any).hot) {
        (module as any).hot.addDisposeHandler((data: any) => {
            console.log('Hit');
        });
        console.log('index.ts', (module as any).hot.dependencies);
        (module as any).hot.accept((err: any) => {
            console.log('HMR Error', err);
        });
    }
}

app.get('/', (req, res) => {
    res.send('Hello World')
});

dynamicImport()
    .then(data => {
        console.log(data);
        console.log(data.jsFile.testFunc());
    });

module.exports = app;

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