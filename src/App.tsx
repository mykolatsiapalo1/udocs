import { Route, Routes } from "react-router-dom";
import Deliverables from "./pages/Deliverables";
import CreateReport from "./pages/CreateReport";

export default function App() {
  return (
    <>
      {/* <Deliverables /> */}
      <Routes>
        <Route path="/" element={<Deliverables />} />
        <Route path="/createReport" element={<CreateReport />} />
      </Routes>
    </>
  );
}
