import React from "react";

import Routes from "./Routes";
import GlobalStyle from "./styles/global";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes />
    </>
  );
};

export default App;
