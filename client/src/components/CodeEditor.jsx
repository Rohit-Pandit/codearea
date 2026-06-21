import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, setCode }) => {
  return (
    <Editor
      height="500px"
      theme="vs-dark"
      defaultLanguage="javascript"
      value={code}
      onChange={(value) => setCode(value || "")}
    />
  );
};

export default CodeEditor;
