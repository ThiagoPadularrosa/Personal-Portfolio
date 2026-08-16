import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import './projects.css'


export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#e8edf2] overflow-X-hidden mb-6">
      <Hero />
      <Projects />
    </div>
  )
}