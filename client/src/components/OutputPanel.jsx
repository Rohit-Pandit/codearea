const OutputPanel = ({ output }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 h-40 overflow-auto">
      <h3 className="font-semibold mb-2">
        Output
      </h3>

      <pre className="text-sm whitespace-pre-wrap">
        {output || "Run code to see output"}
      </pre>
    </div>
  );
};

export default OutputPanel;