import HueShiftPreview from './HueShiftPreview'
import CounterPreview from './CounterPreview'
import ReviewsPreview from './ReviewsPreview'
import ScrollReveal from '../../../components/ScrollReveal'

const projects = [
  {
    label: 'Background Color Generator',
    href: 'https://github.com/ftisher26/Color-Flipper.git',
    Preview: HueShiftPreview,
    delay: 'animate-fade-up-delay-1',
  },
  {
    label: 'Counter App',
    href: 'https://github.com/ftisher26/Carousel-Reviews.git',
    Preview: CounterPreview,
    delay: 'animate-fade-up-delay-2',
  },
  {
    label: 'Reviews Slider',
    href: 'https://github.com/ftisher26/Carousel-Reviews.git',
    Preview: ReviewsPreview,
    delay: 'animate-fade-up-delay-3',
  },
]

export default function Projects() {
  return (
    <ScrollReveal>
      <section className="bg-[#edf2f7] px-[5%] py-16">
        {/* Section title */}
        <div className="text-center mb-10">
          <h2 className="font-courier text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-[#1a1a2e] mb-2 tracking-wide">
            DOM Projects
          </h2>
          <span className="block w-15 h-0.75 bg-[#4a9eff] mx-auto rounded-full" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 max-w-275 mx-auto">
          {projects.map(({ label, href, Preview, delay }) => (
            <div
              key={label}
              className={`bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_28px_rgba(0,0,0,0.1)] ${delay}`}
            >
              {/* Interactive preview — no link here */}
              <Preview />

              {/* Link only in the label */}
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 px-4 py-3 text-[0.82rem] font-medium text-[#718096] no-underline border-t border-[#edf2f7] rounded-b-xl transition-all duration-200 hover:text-[#4a9eff] hover:bg-[#f0f7ff] group"
              >
                {label}
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </ScrollReveal>
  )
}
