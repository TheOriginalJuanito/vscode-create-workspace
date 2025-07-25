"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
function activate(context) {
  let disposable = vscode.commands.registerCommand("extension.createProject", async (uri) => {
    const folderPath = uri.fsPath;
    const projectName = await vscode.window.showInputBox({
      prompt: "Enter Project Name",
      value: "NewProject"
    });
    if (!projectName) {
      vscode.window.showErrorMessage("Project name is required.");
      return;
    }
    const projectPath = path.join(folderPath, projectName);
    fs.mkdirSync(projectPath);
    fs.writeFileSync(path.join(projectPath, "index.html"), `<!DOCTYPE html>
<html>
<head>
  <title>${projectName}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Welcome to ${projectName}</h1>
  <script src="script.js"></script>
</body>
</html>`);
    fs.writeFileSync(path.join(projectPath, "styles.css"), `body {
  font-family: sans-serif;
}
`);
    fs.writeFileSync(path.join(projectPath, "script.js"), `console.log('Welcome to ${projectName}');`);
    vscode.window.showInformationMessage(`Created project: ${projectName}`);
  });
  context.subscriptions.push(disposable);
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
