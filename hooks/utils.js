const fs = require('fs'),
  path = require('path'),
  htmlParser = require('node-html-parser');

//Initial configs
const configs = {
  platforms: "platforms",
  android: {
    platform: "android",
    wwwFolder: "app/src/main/assets/www"
  },
  ios: {
    platform: "ios",
    wwwFolder: "www",
  },
  errorFile: '_error.html'
};

//Function to get the configs object
const getConfigs = () => {
  return configs;
}

//Function that reads a certain file from a specific directory
const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}

//Function that uses the node-html-parser npm package to parse HTML
const parseHTML = (content) => {
  return htmlParser.parse(content);
}

//Function that replaces HTML from a source file to a target file, using selectors to target the HTML node to replace
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

//Function to get the resources folder path for each platform
function getResourcesFolderPath(context, platform, platformConfig) {
  const platformPath = path.join(context.opts.projectRoot, configs.platforms, platform);
  return path.join(platformPath, platformConfig.wwwFolder);
}

module.exports = {
  getConfigs,
  replaceHTMLContent,
  getResourcesFolderPath
}