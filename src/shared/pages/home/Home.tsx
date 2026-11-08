import GamesSection from "@/shared/components/questionsSection/Questions";
import Hero from "@/shared/components/hero/Hero";
import MovingSection from "@/shared/components/movingSection/MovingSection";
import ShowCase from "@/shared/components/showcase/ShowCase";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import Navbar from "@/shared/components/navbar/Navbar";
import Footer from "@/shared/components/footer/Footer";
function Home() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setVisible(current > previous && current > 50);
  });
  return (
    <div>
      <MovingSection />
      <Hero />
      <GamesSection />
      <ShowCase />
    </div>
  );
}

export default Home;
