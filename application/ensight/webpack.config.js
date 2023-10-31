const path = require('path');

module.exports = {
    entry: './frontend/javascript/index.js',
    output: {
        filename: 'index-bundle.js',
        path: path.resolve(__dirname, './static/app/js'),
    },
};