import Editor from "@monaco-editor/react";
import { useState } from "react";

const CodeEditor = () => {
  const [code, setCode] = useState(
`function solve() {

}`
  );

  return (
    <Editor
      height="600px"
      defaultLanguage="javascript"
      value={code}
      onChange={(value) => setCode(value)}
      theme="vs-dark"
    />
  );
};

export default CodeEditor;