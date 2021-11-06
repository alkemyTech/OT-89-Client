import React from "react";
import "./App.css";
import { AppRouter } from "./routes/AppRouter";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";

import Slider from "./components/Slider/Slider";

const App = () => {
  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
