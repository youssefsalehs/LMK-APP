import Hero from "@/shared/components/home/hero/Hero";
import MovingSection from "@/shared/components/home/movingSection/MovingSection";
import GamesSection from "@/shared/components/home/questionsSection/Questions";
import ShowCase from "@/shared/components/home/showcase/ShowCase";
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
