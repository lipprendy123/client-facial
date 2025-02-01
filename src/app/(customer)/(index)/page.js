import Image from "next/image";
import Navbar from "../(index)/_components/Navbar";
import Hero from "../(index)/_components/Hero";
import ServiceCard from "../(index)/_components/Service";
import Footer from "../(index)/_components/Footer";
import About from "./_components/About";

export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <About/>
      <ServiceCard/>
      <Footer/>
    </>
  );
}
