import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.createProject', async (uri: vscode.Uri) => {
    const folderPath = uri.fsPath;

    const projectName = await vscode.window.showInputBox({
      prompt: 'Enter Project Name',
      value: 'NewProject'
    });

    if (!projectName) {
      vscode.window.showErrorMessage('Project name is required.');
      return;
    }

    const projectPath = path.join(folderPath, projectName);
    fs.mkdirSync(projectPath);

    // Create files
    fs.writeFileSync(path.join(projectPath, 'index.html'), `<!DOCTYPE html>
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

    fs.writeFileSync(path.join(projectPath, 'styles.css'), `body {
  font-family: sans-serif;
}
`);

    fs.writeFileSync(path.join(projectPath, 'script.js'), `console.log('Welcome to ${projectName}');`);

    vscode.window.showInformationMessage(`Created project: ${projectName}`);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
