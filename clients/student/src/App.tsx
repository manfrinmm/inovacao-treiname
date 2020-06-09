import React from "react";

import Routes from "~/routes";

import AppProvider from "./hooks";
import GlobalStyle from "./styles/global";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
};

export default App;
