const utils = require("./utils");

module.exports = function (context) {
    const confs = utils.getConfigs();
    const resourcesFolderPath = utils.getResourcesFolderPath(context, "ios", utils.getPlatformConfigs());

    //Error File Changer
    utils.replaceHTMLContent(resourcesFolderPath,'customError' , resourcesFolderPath + confs.errorFile, '#error-screen-wrapper')
}
