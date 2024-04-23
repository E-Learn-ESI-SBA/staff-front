"use client"
import Navbar from "../layouts/navbar";
import Courses from "./courses";
import Testimonilas from "./testimonials";
import HeroSection from "./HeroSection";
import Footer from "../layouts/footer";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/router";
const Landing = () => {

  const isAuth = useUserStore((state) => state.isAuth);
	const router = useRouter();

	if (!isAuth) {
		router.replace('/auth');
	}

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
