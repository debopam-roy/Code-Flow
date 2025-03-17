import React from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

interface CodeEditorProps {
    theme: string;
    handleEditorMount: OnMount;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
    theme,
    handleEditorMount,
}) => {
    return (
        <div className="h-full pt-2">
            <Editor
                width="100%"
                height="100%"
                theme={theme}
                defaultLanguage="text"
                options={{
                    selectOnLineNumbers: true,
                    autoIndent: 'full',
                    formatOnType: true,
                    formatOnPaste: true,
                    minimap: { enabled: false },
                    autoClosingBrackets: 'always',
                    autoClosingQuotes: 'always',
                    tabCompletion: 'on',
                }}
                onMount={handleEditorMount}
            />
        </div>
    );
};

export default CodeEditor;
