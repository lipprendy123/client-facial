import Hero from './_components/Hero'
import About from './_components/About'
import ServiceCard from './_components/Service';
import Faq from './_components/Faq';

// src/app/page.js
export default function Home() {
  return <>
    <Hero/>
    <About/>
    <ServiceCard/>
    <Faq/>
  </>; 
}
