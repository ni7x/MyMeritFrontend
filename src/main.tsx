import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import  { loader } from '@monaco-editor/react';

loader.init().then((monaco) => {
    monaco.editor.defineTheme("customTheme", {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
            'editor.background': '#434550',
            'editor.lineHighlightBackground': '#4f515d',
        },
    });
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
