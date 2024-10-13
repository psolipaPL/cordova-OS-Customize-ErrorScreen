const utils = require("./utils");

module.exports = function (context) {
    const confs = utils.getConfigs();
    const platformConfigs = utils.getPlatformConfigs();
    const resourcesFolderPath = utils.getResourcesFolderPath(context, "android", platformConfigs);

    //Error File Changer
    utils.replaceHTMLContent(resourcesFolderPath,'customError' , resourcesFolderPath + confs.errorFile, '#error-screen-wrapper')
}
