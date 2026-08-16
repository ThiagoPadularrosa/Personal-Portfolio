import ScrollReveal from "../../../components/ScrollReveal";

export default function ExperienceSection() {

  const cardsExp = [
    {  
      title: 'Full-Stack Software Developer',
      subtitles: ['CO. Country/Province/State'], 
      date: '2026 - Present', 
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.' 
    },
    { 
      title: 'Full-Stack Software Developer',
      subtitles: ['CO. Country/Province/State'], 
      date: '2025 - Present',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.' 
    },
  ];

  return (
    <>
    <ScrollReveal>
      <section className="flex flex-col gap-8 overflow-hidden mt-5 md:flex-row xl:ml-20">
        <div className="min-h-85 mt-8">
          
          {/* TITLE */}
          <div className="flex size-fit mb-8">
            <h3 className="font-semibold text-courier text-2xl underline underline-offset-8 md:text-3xl">
              Experience
            </h3>
          </div>

          <div className="flex flex-col lg:flex-row">  
            <div className="flex flex-col items-center justify-evenly mr-6 w-full min-[320px]:max-lg:h-0 min-[320px]:max-lg:invisible">  

              {/* CIRCLE N1 */}
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                <p className='font-bold'>2026</p>
              </div>

              {/* CONNECTOR LINE */}
              <div className="w-37.5 h-0.5 bg-blue-300 shrink-0 rotate-90"></div>

              {/* CIRCLE N2 */}
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                <p className='font-bold'>2025</p>
              </div>

            </div>

            {/* CARDS */}
            <div className="grid w-full gap-10 mx-auto">
              {cardsExp.map((item, index) => (
                <div 
                  key={index}
                  className="bg-[#202020] w-full h-fit border-2 rounded-2xl border-blue-700 lg:w-205"
                >
                  <h3 className="text-lg text-white font-bold size-fit mt-2 ml-8">
                    {item.title}
                  </h3>

                  {/* Render the subtitles and description */}
                  <div className="flex flex-wrap size-fit gap-x-2 gap-y-3 mt-2 ml-8">
                    {item.subtitles.map((subtitle, idx) => (
                      <span 
                        key={idx}
                        className={`text-lg font-medium lowercase bg-transparent text-blue-600 tracking-wider`}
                      >
                        {subtitle}
                      </span>
                    ))}
                  </div>
                  <div className="p-2 size-fit">
                    <p className="text-white italic size-fit ml-6 mt-1">{item.date}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-base text-white size-fit pb-2 ml-4">
                      {item.description}
                    </p>
                  </div>  
                </div>
              ))}
            </div>
          </div> 
        </div>
      </section>
      </ScrollReveal>
    </>
  )
}