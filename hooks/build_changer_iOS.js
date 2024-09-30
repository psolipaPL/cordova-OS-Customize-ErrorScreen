const utils = require("./utils");

module.exports = function (context) {

  const confs = utils.getConfigs();
  const appId = utils.getAppIdentifier(context.opts.projectRoot + confs.configPathIos);

  //Error File Changer
  let errorFileContent = utils.readFile(context.opts.projectRoot + confs.iosPath + confs.errorFile);
  utils.errorFileReplacer(context.opts.projectRoot + confs.iosPath + confs.errorFile, errorFileContent, confs.textToReplace, '');
}