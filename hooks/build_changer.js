const utils = require("./utils");

module.exports = function (context) {
    const confs = utils.getConfigs();

    //Error File Changer
    utils.replaceHTMLContent(context.opts.projectRoot + confs.androidPath,'customError' , context.opts.projectRoot + confs.androidPath + confs.errorFile, '#error-screen-wrapper')
}
