import Image from "next/image";
import Navbar from "../components/Navbar/navbar";
import Dashboard from "../components/Dashboard/dashboard";
import Coursecard from "../components/CoursesCard/coursescard";
export default function Home() {
  return (
    <div >
      <Navbar/>
      <Dashboard />
    </div>
  );
}
