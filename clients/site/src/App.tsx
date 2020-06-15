import React from "react";
import { ToastContainer } from "react-toastify";

import AppProvider from "./hooks";
import Routes from "./Routes";
import GlobalStyle from "./styles/global";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ToastContainer autoClose={5000} />

      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
};

export default App;
