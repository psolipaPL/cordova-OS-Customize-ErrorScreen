module.exports = function (context) {

    const envVariables = process.env;

    console.log('Environment Variables:');
    console.log(JSON.stringify(envVariables, null, 2));
};