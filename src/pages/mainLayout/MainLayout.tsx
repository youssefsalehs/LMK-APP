import Navbar from "@/components/navbar/Navbar";
import ThemeBtn from "@/components/theme/ThemeBtn";
import { Outlet } from "react-router";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import Footer from "@/components/footer/Footer";

export default function MainLayout() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setVisible(current > previous && current > 50);
  });

  return (
    <div className="bg-primary min-h-screen text-primary-foreground">
      <motion.div
        className="fixed inset-x-0 top-0 z-50 bg-primary"
        initial={{ y: "-100%", opacity: 0 }}
        animate={{
          y: visible ? 0 : "-100%",
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="w-[97%] mx-auto px-3">
          <Navbar />
        </div>
      </motion.div>

      <main>
        <Outlet />
      </main>
      <Footer />
      <ThemeBtn />
    </div>
  );
}
