const utils = require("./utils");

module.exports = function (context) {
    const confs = utils.getConfigs();

    //Error File Changer
    //let errorFileContent = utils.readFile(context.opts.projectRoot + confs.androidPath + confs.errorFile);
    //utils.errorFileReplacer(context.opts.projectRoot + confs.androidPath + confs.errorFile, errorFileContent, confs.textToReplace, '');
    utils.replaceHTMLContent(context.opts.projectRoot + confs.androidPath,'customError' , context.opts.projectRoot + confs.androidPath + confs.errorFile, '#error-screen-wrapper')
}
