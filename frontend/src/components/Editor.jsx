import React from "react";
import MonacoEditor from "react-monaco-editor";
// import EditorTab from "./EditorTab";
// import { FaPlus } from "react-icons/fa";

const CodeEditor = ({
  selectedLanguage,
  codeSnippet,
  handleEditorMount,
}) => {
  const editorOptions = {
    selectOnLineNumbers: true,
    autoIndent: "full",
    formatOnType: true,
    formatOnPaste: true,
    suggestOnTriggerCharacters: true,
    tabSize: 4,
    minimap: { enabled: true },
    snippetSuggestions: "top",
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    tabCompletion: "on",
  };

  return (
    <div>
      {/* Tab component with active tab management
      <EditorTab
        activeTab={activeTab}
        onTabChange={setActiveTab} // Update only the active tab
      /> */}

      {/* Monaco Editor */}
      <MonacoEditor
        width='100%'
        height='70vh'
        language={selectedLanguage}
        theme='vs-dark'
        value={codeSnippet}
        options={editorOptions}
        editorDidMount={handleEditorMount}
      />
    </div>
  );
};

export default CodeEditor;
