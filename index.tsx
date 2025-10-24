
import React, { useState, useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// --- Merged content from App.tsx ---

const initialCode = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <title>صفحة تجريبية</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
    
    body { 
      font-family: 'Cairo', sans-serif; 
      background-color: #f4f7f9;
      color: #333;
      text-align: center;
      padding: 2rem;
      transition: background-color 0.3s ease;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    h1 {
      color: #0056b3;
    }
    p {
      color: #555;
      line-height: 1.6;
    }
    button {
      background: linear-gradient(45deg, #007bff, #0056b3);
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      margin-top: 1rem;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>مرحباً بك في مُعاينة HTML!</h1>
    <p>يمكنك تعديل هذا الكود مباشرة في المحرر على اليسار لرؤية التغييرات هنا.</p>
    
    <button id="alertButton">اضغط هنا</button>
  </div>

  <script>
    document.getElementById('alertButton').addEventListener('click', function() {
      alert('تم النقر على الزر بنجاح!');
    });
  </script>

</body>
</html>
`;

const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);

declare const Prism: any;

function App() {
  const [code, setCode] = useState<string>(initialCode);
  const [renderedCode, setRenderedCode] = useState<string>(initialCode);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }, [code]);

  const syncScroll = useCallback(() => {
    if (editorRef.current && preRef.current) {
      preRef.current.scrollTop = editorRef.current.scrollTop;
      preRef.current.scrollLeft = editorRef.current.scrollLeft;
    }
  }, []);

  const handlePreview = useCallback(() => {
    setRenderedCode(code);
  }, [code]);

  const handleClear = useCallback(() => {
    setCode(initialCode);
    setRenderedCode(initialCode);
  }, []);

  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col font-sans">
      <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center z-10 border-b border-gray-700">
        <div className="flex items-center">
          <CodeIcon />
          <h1 className="text-xl font-bold text-cyan-400">أداة معاينة HTML</h1>
        </div>
        <div className="flex items-center gap-4">
            <button
              onClick={handleClear}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
              aria-label="مسح المحرر وإعادة تعيينه"
            >
              مسح
              <TrashIcon />
            </button>
            <button
              onClick={handlePreview}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
              aria-label="عرض المعاينة"
            >
              معاينة
              <PlayIcon />
            </button>
        </div>
      </header>
      
      <main className="flex-grow flex flex-row overflow-hidden">
        {/* Editor Panel */}
        <div className="w-1/2 flex flex-col p-4 border-r border-gray-700">
          <h2 className="text-lg font-semibold mb-2 flex items-center text-gray-300">
            <CodeIcon />
            المحرر (HTML/CSS/JS)
          </h2>
          <div className="flex-grow h-full relative">
              <textarea
                ref={editorRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onScroll={syncScroll}
                spellCheck="false"
                className="code-editor absolute top-0 left-0 w-full h-full p-4 bg-transparent border-transparent rounded-lg text-transparent focus:outline-none resize-none z-10"
                placeholder="أدخل الكود هنا..."
              />
              <pre
                ref={preRef}
                className="w-full h-full rounded-lg"
                aria-hidden="true"
              >
                <code className="language-html">
                  {`${code}\n`}
                </code>
              </pre>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 flex flex-col p-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center text-gray-300">
              <EyeIcon />
              المعاينة
            </h2>
            <div className="flex-grow h-full bg-white rounded-lg overflow-hidden shadow-inner">
              <iframe
                  srcDoc={renderedCode}
                  title="Preview"
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-modals allow-forms"
              />
            </div>
        </div>
      </main>
    </div>
  );
}

// --- Original index.tsx render logic ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);