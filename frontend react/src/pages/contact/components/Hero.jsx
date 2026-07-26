export default function Hero() {
  return (
    <section className="flex w-full h-[90vh] relative overflow-hidden text-[#f5f5f5] p-[0_20px]">
      <h1 className="inline-flex animate-fade-in flex-col justify-center items-center text-center text-shadow-lg/50 color-[#f5f5f5] relative h-auto w-full z-1 font-courier font-bold text-[1.6rem] leading-6 tracking-[1px] min-[320px]:max-[383px]:text-[1.2rem] sm:text-[2.5rem] sm:leading-9">
        <span className="block">Hello.</span>
        Let's work together<br/>
        on your next project.
      </h1>

      <div className="contents justify-center items-center w-full h-[70vh] bg-transparent relative shrink-0 z-0">
        <img 
        loading='eager'
        fetchPriority='high'
        src="/images/banner2.webp" 
        alt="A simple banner" 
        className="absolute top-0 left-0 w-full h-full object-cover aspect-video z-0" />
      </div>
    </section>
  )
}