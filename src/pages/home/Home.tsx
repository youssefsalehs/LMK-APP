import GamesSection from "@/components/homeComponents/questionsSection/Questions";
import Hero from "@/components/homeComponents/hero/Hero";
import MovingSection from "@/components/homeComponents/movingSection/MovingSection";
import ShowCase from "@/components/homeComponents/showcase/ShowCase";

function Home() {
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
