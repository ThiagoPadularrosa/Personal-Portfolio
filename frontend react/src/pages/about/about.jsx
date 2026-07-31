import Hero from "./components/Hero";
import Experiences from "./components/Experiences"
import ErrorBoundary from "../../components/ErrorBoundary"

export default function About() {
  return (
    <div className="min-h-screen overflow-x-hidden mb-6">
      <Hero />
      <ErrorBoundary>
        <Experiences />
      </ErrorBoundary>
    </div>
  );
};