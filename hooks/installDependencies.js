const utils = require('./utils');

module.exports = function (context) {
  const cordovaAbove8 = utils.isCordovaAbove(context, 8);
  let child_process;
  let deferral;
  
  if (cordovaAbove8) {
    child_process = require('child_process');
    deferral = require('q').defer();
  } else {
    child_process = context.requireCordovaModule('child_process');
    deferral = context.requireCordovaModule('q').defer();
  }

  const hooksDir = path.join(context.opts.plugin.dir, 'hooks');
  console.log(`Hooks dir: ${hooksDir}`)

  const output = child_process.exec('npm install', {cwd: hooksDir}, function (error) {
    if (error !== null) {
      console.log('exec error: ' + error);
      deferral.reject('npm installation failed');
    }
    else {
      deferral.resolve();
    }
  });

  return deferral.promise;
};