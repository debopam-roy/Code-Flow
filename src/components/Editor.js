import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css'; // Choose your preferred theme
import 'codemirror/mode/javascript/javascript'; // Choose the appropriate mode for your use case
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
const Editor = () => {
  const options = {
    mode: 'javascript',
    theme: 'material', // Choose your preferred theme
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
  };

  const handleChange = (editor, data, value) => {
    // Handle changes in the editor content
  };

  return (
    <div>
      <CodeMirror
        value="const example = 'Hello, CodeMirror!';"
        options={options}
        onBeforeChange={(editor, data, value) => handleChange(editor, data, value)}
      />
    </div>
  );
}

export default Editor