import GamesSection from "@/shared/components/questionsSection/Questions";
import Hero from "@/shared/components/hero/Hero";
import MovingSection from "@/shared/components/movingSection/MovingSection";
import ShowCase from "@/shared/components/showcase/ShowCase";

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
