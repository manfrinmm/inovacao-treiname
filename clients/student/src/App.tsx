import React from "react";
import { ToastContainer } from "react-toastify";

import Routes from "~/routes";

import AppProvider from "./hooks";
import GlobalStyle from "./styles/global";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <Routes />
        <ToastContainer autoClose={3000} />
      </AppProvider>
    </>
  );
};

export default App;
