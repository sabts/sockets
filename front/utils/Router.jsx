import { Route, Routes } from "react-router";
import Chat from "../pages/chat/chat";

const Router = () => {
  return (
    <Routes>
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default Router;
