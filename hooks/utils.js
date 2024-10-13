const fs = require('fs'),
    path = require('path'),
    htmlParser = require('node-html-parser');

//Initial configs
const configs = {
  platforms: "platforms",
  android: {
    platform: "android",
    wwwFolder: "assets/www"
  },
  ios: {
    platform: "ios",
    wwwFolder: "www",
  },
  errorFile: '_error.html'
};

const getConfigs = () => {
    return configs;
}

const readFile = (filePath) => {
    try {
        return fs.readFileSync(filePath, "utf-8");
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

const parseHTML = (content) => {
    return htmlParser.parse(content);
}

const replaceHTMLContent = (dir, fileName, targetFilePath, selector) => {
    try {
        const files = fs.readdirSync(dir);
        const src = files.find(file => file.includes(fileName));

        const sourceFile = parseHTML(readFile(path.join(dir, src)));
        const targetFile = parseHTML(readFile(targetFilePath));
        //Set the html content of the selector and remove unused style class
        targetFile.querySelector('style').remove(); 
        targetFile.querySelector(selector).set_content(sourceFile.querySelector('#error-screen-message__wrapper').toString())

        //Rewrites the file with the new changes
        fs.writeFileSync(targetFilePath, targetFile.toString());

    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

const errorFileReplacer = (errorPath, content, textToReplace, replacementText) => {
    content = content.replace(textToReplace, replacementText);
    fs.writeFileSync(errorPath, content, "utf-8");
}
  
  function getResourcesFolderPath(context, platform, platformConfig) {
    const platformPath = path.join(context.opts.projectRoot, constants.platforms, platform);
    return path.join(platformPath, platformConfig.wwwFolder);
  }
  
  function getPlatformConfigs(platform) {
    if (platform === configs.android.platform) {
      return configs.android;
    } else if (platform === configs.ios.platform) {
      return configs.ios;
    }
  }
  
  function isCordovaAbove(context, version) {
    const cordovaVersion = context.opts.cordova.version;
    console.log(cordovaVersion);
    const sp = cordovaVersion.split('.');
    return parseInt(sp[0]) >= version;
  }
  

module.exports = {
    getConfigs,
    readFile,
    errorFileReplacer,
    parseHTML,
    replaceHTMLContent,
    isCordovaAbove,
    getResourcesFolderPath,
    getPlatformConfigs,
}