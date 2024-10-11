const fs = require('fs'),
    path = require('path'),
    htmlParser = require('node-html-parser');

//Initial configs
const configs = {
    textToReplace: 'There was an error processing your request.',
    androidPath: "/platforms/android/app/src/main/assets/www/",
    androidMainPath: "/platforms/android/app/src/main/",
    androidAppPath: "/platforms/android/app/",
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

const replaceHTMLContent = (sourceFilePath, targetFilePath, selector) => {
    try {
        const sourceFile = parseHTML(readFile(sourceFilePath));
        const targetFile = parseHTML(readFile(targetFilePath));

        targetFile.querySelector(selector).toString() = sourceFile.querySelector(selector).toString()
        fs.writeFileSync(targetFilePath, targetFile);


    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

const errorFileReplacer = (errorPath, content, textToReplace, replacementText) => {
    content = content.replace(textToReplace, replacementText);
    fs.writeFileSync(errorPath, content, "utf-8");
}

module.exports = {
    getConfigs,
    readFile,
    errorFileReplacer,
    parseHTML,
    replaceHTMLContent
}
/*module.exports = function(context) {

}*/