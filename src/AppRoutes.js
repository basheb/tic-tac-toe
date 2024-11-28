import { Route, Routes } from "react-router";

import App from "./App";
import Game from "./game/game";
import React from "react";

const AppRoutes = () => (
  <Routes>
    <Route exact path="/" element={<App />} />
    <Route path="/game" element={<Game />} />
  </Routes>
);

export default AppRoutes;
