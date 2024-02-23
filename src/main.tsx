import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

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

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
);
