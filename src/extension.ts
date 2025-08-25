import * as vscode from 'vscode';

// Activa la extensión
export function activate(context: vscode.ExtensionContext) {
    const command = 'autodoc-lite.generateComment';

    const commandHandler = async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No hay un editor de texto activo.');
            return;
        }

        const languageId = editor.document.languageId;
        const commentPrefix = getCommentPrefix(languageId);

        if (!commentPrefix) {
            vscode.window.showErrorMessage(`El lenguaje '${languageId}' no es compatible con AutoDoc-Lite.`);
            return;
        }

        const functionBlock = findFunctionBlock(editor);
        if (!functionBlock) {
            vscode.window.showErrorMessage('No se pudo encontrar una función o método en la posición actual del cursor.');
            return;
        }

        const comment = `${commentPrefix} TODO: Explica esta función y sus parámetros`;

        // Vista previa del comentario
        const userChoice = await vscode.window.showInformationMessage(
            `Se insertará el siguiente comentario:\n\n${comment}`,
            { modal: true },
            'Aceptar'
        );

        if (userChoice === 'Aceptar') {
            editor.edit(editBuilder => {
                editBuilder.insert(functionBlock.start, comment + '\n');
            });
            vscode.window.showInformationMessage('Comentario agregado con éxito. 🚀');
        }
    };

    context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}

// Desactiva la extensión
export function deactivate() {}

/**
 * Obtiene el prefijo de comentario basado en el ID del lenguaje.
 * @param languageId El ID del lenguaje del editor activo.
 * @returns El prefijo de comentario ('//' o '#') o null si no es compatible.
 */
function getCommentPrefix(languageId: string): string | null {
    const supportedLanguages: { [key: string]: string } = {
        'javascript': '//',
        'typescript': '//',
        'javascriptreact': '//',
        'typescriptreact': '//',
        'java': '//',
        'csharp': '//',
        'python': '#',
    };
    return supportedLanguages[languageId] || null;
}

/**
 * Encuentra el bloque de función o método más cercano a la posición del cursor.
 * Por ahora, simplemente devuelve la línea actual como un rango.
 * TODO: Implementar una lógica más robusta para detectar el bloque completo.
 * @param editor El editor de texto activo.
 * @returns Un rango que representa el bloque de la función.
 */
function findFunctionBlock(editor: vscode.TextEditor): vscode.Range | null {
    const position = editor.selection.active;
    const line = editor.document.lineAt(position.line);

    // Implementación simplificada: usa la línea actual.
    // Una implementación real buscaría hacia arriba y abajo para encontrar `{` y `}` o indentación.
    if (!line.isEmptyOrWhitespace) {
        return line.range;
    }

    return null;
}