import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <Outlet /> {/* <-- This renders nested routes */}
      </main>
    </>
  );
}
