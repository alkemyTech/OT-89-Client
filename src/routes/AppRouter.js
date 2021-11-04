import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListScreen from "../components/ListScreen/ListScreen";

export const AppRouter = () => {
  return (
    <>
      <ListScreen />
    </>
  );
};
