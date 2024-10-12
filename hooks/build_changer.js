const utils = require("./utils");

module.exports = function (context) {
    const confs = utils.getConfigs();
    //const appId = utils.getAppIdentifier(context.opts.projectRoot + confs.configPathAndroid);

    //Indexes Changer
    //let indexFileContent = utils.readFile(context.opts.projectRoot + confs.androidPath + confs.indexFile);
    //utils.indexReplacer(context.opts.projectRoot + confs.androidPath + confs.indexFile, indexFileContent);

    //Error File Changer
    //let errorFileContent = utils.readFile(context.opts.projectRoot + confs.androidPath + confs.errorFile);
    //utils.errorFileReplacer(context.opts.projectRoot + confs.androidPath + confs.errorFile, errorFileContent, confs.textToReplace, '');
    utils.replaceHTMLContent(context.opts.projectRoot + confs.androidPath + confs.errorFile, context.opts.projectRoot + confs.androidPath + 'customError.html', '#error-screen-wrapper')
}
