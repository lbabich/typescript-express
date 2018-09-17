const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config');

dotenv.config();
const compiler = webpack(webpackConfig);
const app = express();

app.use(
    webpackDevMiddleware(compiler, {
        noInfo: true,
        stats: {colors: true}
    })
);

app.use(webpackHotMiddleware(compiler));

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.start = function appStart() {
    app.listen(app.get('port'), () => {
        console.log(('App is running at http://localhost:%d in %s mode'),
            app.get('port'), app.get('env'));
        console.log('Press CTRL-C to stop\n');
    });
};

app.get('/', (req, res) => {
    res.send('Hello Yes');
});

module.exports = app;
