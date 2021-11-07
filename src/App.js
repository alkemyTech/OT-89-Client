import React from "react";
import { AppRouter } from "./routes/AppRouter";
import { Provider } from "react-redux";

function App(){

  const store = configureStore()

  return (
    <Provider store = {store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
