const fs = require('fs'),
    path = require('path'),
    htmlParser = require('node-html-parser');

//Initial configs
const configs = {
    textToReplace: 'There was an error processing your request.',
    androidPath: "/platforms/android/app/src/main/assets/www/",
    iosPath: "/platforms/ios/www/",
    iosMainPath: "/platforms/ios/",
    errorFile: '_error.html',
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

const constants = {
    platforms: "platforms",
    android: {
      platform: "android",
      wwwFolder: "assets/www",
      trapezeFileExtension: ".yaml"
    },
    ios: {
      platform: "ios",
      wwwFolder: "www",
      trapezeFileExtension: ".yaml"
    },
    zipExtension: ".zip",
    folderNameSuffix: "trapeze",
    folderNamePrefix: "trapeze"
  };

  function handleError(errorMessage, defer) {
    console.log(errorMessage);
    defer.reject();
  }
  
  function checkIfFolderExists(path) {
    return fs.existsSync(path);
  }
  
  function getFilesFromPath(path) {
    return fs.readdirSync(path);
  }
  
  function createOrCheckIfFolderExists(path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }
  
  function getSourceFolderPath(context, wwwPath) {
    let sourceFolderPath;
    const cordovaAbove7 = isCordovaAbove(context, 7);
  
    console.log("cordovaAbove7: " + cordovaAbove7);
  
    // New way of looking for the configuration files' folder
    if (cordovaAbove7) {
      sourceFolderPath = path.join(context.opts.projectRoot, "www", constants.folderNameSuffix);
      console.log("Using #1 sourceFolderPath: " + sourceFolderPath);
    } else {
      sourceFolderPath = path.join(wwwPath, constants.folderNameSuffix);
      console.log("Using #2 sourceFolderPath: " + sourceFolderPath);
    }
  
    // Fallback to deprecated way of looking for the configuration files' folder
    if(!checkIfFolderExists(sourceFolderPath)) {
      console.log("Using deprecated way to look for configuration files' folder");
      if (cordovaAbove7) {
        sourceFolderPath = path.join(context.opts.projectRoot, "www", constants.folderNamePrefix);
        console.log("Using #3 sourceFolderPath: " + sourceFolderPath);
      } else {
        sourceFolderPath = path.join(wwwPath, constants.folderNamePrefix);
        console.log("Using #4 sourceFolderPath: " + sourceFolderPath);
      }
    }
  
    console.log("Using sourceFolderPath: " + sourceFolderPath);
  
    return sourceFolderPath;
  }
  
  function getResourcesFolderPath(context, platform, platformConfig) {
    const platformPath = path.join(context.opts.projectRoot, constants.platforms, platform);
    return path.join(platformPath, platformConfig.wwwFolder);
  }
  
  function getPlatformConfigs(platform) {
    if (platform === constants.android.platform) {
      return constants.android;
    } else if (platform === constants.ios.platform) {
      return constants.ios;
    }
  }
  
  function getZipFile(folder, zipFileName) {
    try {
      const files = getFilesFromPath(folder);
      for (var i = 0; i < files.length; i++) {
        if (files[i].endsWith(constants.zipExtension)) {
          var fileName = path.basename(files[i], constants.zipExtension);
          if (fileName === zipFileName) {
            return path.join(folder, files[i]);
          }
        }
      }
    } catch (e) {
      console.log(e);
      return;
    }
  }
  
  function isCordovaAbove(context, version) {
    const cordovaVersion = context.opts.cordova.version;
    console.log(cordovaVersion);
    const sp = cordovaVersion.split('.');
    return parseInt(sp[0]) >= version;
  }
  
  
  function copyFromSourceToDestPath(defer, sourcePath, destPath) {
  
    console.log('copyFromSourceToDestPath sourcePath: ' + sourcePath + " and destPath: " + destPath);
  
    fs.createReadStream(sourcePath).pipe(fs.createWriteStream(destPath))
    .on("close", function (err) {
      defer.resolve();
    })
    .on("error", function (err) {
      console.log(err);
      defer.reject();
    });
  }

module.exports = {
    getConfigs,
    readFile,
    errorFileReplacer,
    parseHTML,
    replaceHTMLContent,
    isCordovaAbove,
    handleError,
    getZipFile,
    getResourcesFolderPath,
    getPlatformConfigs,
    copyFromSourceToDestPath,
    getFilesFromPath,
    createOrCheckIfFolderExists,
    checkIfFolderExists,
    getSourceFolderPath
}
/*module.exports = function(context) {

}*/