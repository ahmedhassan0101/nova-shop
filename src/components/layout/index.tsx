// src\components\layout\index.tsx
import { ReactNode } from "react";
import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* <Sidebar /> */}
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
