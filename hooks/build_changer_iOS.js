const utils = require("./utils");

module.exports = function (context) {
    const confs = utils.getConfigs();
    const resourcesFolderPath = utils.getResourcesFolderPath(context, "ios", confs.ios);

    //Error File Changer
    utils.replaceHTMLContent(resourcesFolderPath,'customError' , `${resourcesFolderPath}/${confs.errorFile}`, '#error-screen-wrapper')
}
