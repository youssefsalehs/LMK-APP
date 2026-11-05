import Footer from "@/shared/components/footer/Footer";
import Navbar from "@/shared/components/navbar/Navbar";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Outlet } from "react-router";

export default function MainLayout() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setVisible(current > previous && current > 50);
  });

  return (
    <div className="bg-primary min-h-screen flex flex-col text-primary-foreground">
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

      <main className="flex-1">
        <Outlet />
      </main>

      <div className="mt-0 ">
        <Footer />
      </div>
    </div>
  );
}
