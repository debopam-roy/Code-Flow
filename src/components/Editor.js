// Editor.js
import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";

const Editor = ({ language, template, textSize, theme }) => {
  const [code, setCode] = useState(template);

  //TODO: Use a module to generate the template for the code base selected...
  //TODO: On copy and on paste
  useEffect(() => {
    setCode(template);
  }, [template]);
  return (
    <div style={{ fontSize: textSize }}>
      <CodeMirror
        value={code}
        height='100vh'
        theme={theme}
        onChange={(newCode) => {
          console.log(newCode.length());
          if (newCode.length() === 0) {
            setCode(template);
          }
          setCode(newCode);
        }}
      />
    </div>
  );
};

export default Editor;
