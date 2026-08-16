import Hero from "./components/Hero";
import MainSection from "./components/MainSection";
import './home.css'

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Hero />
      <MainSection />
    </div>
  );
};