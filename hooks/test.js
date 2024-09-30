module.exports = function (context) {

    const fs = require('fs');
    const envVariables = process.env;

    console.log('Environment Variables:');
    console.log(JSON.stringify(envVariables, null, 2));

    const fileList = fs.readdirSync('/');
    console.log('Files and folders in the directory:', fileList);
};