import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    console.log("AutoDoc Lite activo");

    let disposable = vscode.commands.registerCommand(
        "autodoc-lite.generateComment",
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;

            const selection = editor.selection;
            const code = editor.document.getText(selection);

            if (!code) {
                vscode.window.showErrorMessage("Selecciona un bloque de código primero");
                return;
            }

            const comment = generateFakeComment(code);

            editor.edit(editBuilder => {
                editBuilder.insert(selection.start, comment + "\n");
            });

            vscode.window.showInformationMessage("Comentario agregado 🚀");
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}

function generateFakeComment(codeBlock: string): string {
    const templates = [
        "Este bloque inicializa variables importantes",
        "Función que procesa datos de entrada y retorna resultado",
        "Loop principal que recorre todos los elementos",
        "Aquí se realizan operaciones críticas",
        "Bloque de código que maneja errores",
        "Lógica principal de la función",
        "Preparación de datos antes de la ejecución",
        "Validación de parámetros de entrada"
    ];

    const comment = templates[Math.floor(Math.random() * templates.length)];
    return "// " + comment;
}
