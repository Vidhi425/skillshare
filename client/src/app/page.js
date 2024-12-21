import Image from "next/image";
import Navbar from "../components/Navbar/navbar";
import Dashboard from "../components/Dashboard/dashboard";
export default function Home() {
  return (
    <div className="flex-row">
      <Navbar/>
      <main className="ml-72 p-6 flex-1 bg-gray-1000 min-h-screen">
      <Dashboard />
      </main>
    </div>
  );
}
