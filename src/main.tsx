import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

import { loader } from "@monaco-editor/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import { SkeletonTheme } from 'react-loading-skeleton';

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

export const loadingToast = (message, id = null) => {
  if (id) {
    toast.update(id, {
      render: message,
      className: "toast-loading",
      isLoading: true,
      autoClose: false
    });
    return id;
  } else {
    return toast.loading(message, {
      className: "toast-loading",
      autoClose: false
    });
  }
};

export const updateToast = (message, type, id = null) => {
  if (id) {
    toast.update(id, {
      render: message,
      type: type,
      className: `toast-${type}`,
      isLoading: false,
      autoClose: 1000
    });
  } else {
    toast[type](message, {
      className: `toast-${type}`,
      autoClose: 5000
    });
  }
};


export const successToast = (message, id = null) => {
  updateToast(message, "success", id);
};


export const errorToast = (message, id = null) => {
  updateToast(message, "error", id)
};

export const toastDismiss = () => {
  toast.dismiss();
};

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SkeletonTheme baseColor="#21222c" highlightColor="#2c2d37">
            <App />
          </SkeletonTheme>
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
