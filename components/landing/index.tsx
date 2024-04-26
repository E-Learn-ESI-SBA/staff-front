"use client";
import Navbar from "../layouts/navbar";
import Courses from "./courses";
import Testimonilas from "./testimonials";
import HeroSection from "./HeroSection";
import Footer from "../layouts/footer";
const Landing = () => {
  return (
    <div className="bg-[#002979]">
      <Navbar />
      <HeroSection />
      <Courses />
      <Testimonilas />
      <Footer />
    </div>
  );
};

export default Landing;
