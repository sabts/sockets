import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router";
import Router from "../utils/Router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
