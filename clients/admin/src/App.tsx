import React from "react";

import AppProvider from "./hooks";
import Routes from "./routes";
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
