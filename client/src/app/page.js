import Image from "next/image";
import Navbar from "../components/Navbar/navbar";
import Dashboard from "../components/Dashboard/dashboard";
import Coursecard from "../components/CoursesCard/coursescard";
import LandingPage from "@/components/LandingPage/landingpage";
export default function Home() {
  return (
    <div >
      <Navbar/>
      {/* <Dashboard /> */}
  <LandingPage/>
    </div>
  );
}
