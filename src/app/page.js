import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServiceCard from "./components/Service";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <ServiceCard/>
      <Footer/>
    </>
  );
}
