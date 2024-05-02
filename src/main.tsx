import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

import { loader } from "@monaco-editor/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";

loader.init().then((monaco) => {
  monaco.editor.defineTheme("customTheme", {
    base: "hc-black",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#3a3b46",
      "editor.lineHighlightBackground": "#434450",
    },
  });
});

export const successToast = (message) => {
  toast.success(message, {
    className: "toast-success",
  });
};

export const errorToast = (errorMessage) => {
  toast.error(errorMessage, {
    className: "toast-error",
  });
};

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            theme="dark"
          />
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
);
