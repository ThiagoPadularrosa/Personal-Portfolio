import ScrollReveal from '../../../components/ScrollReveal';
import ExpSection from './ExpSection';

export default function SkillsCards() {

  const cardsData = [
    {
      category: 'Frontend',
      skills: ["HTML5", "CSS", "JavaScript", "React"]
    },
    {
      category: 'Backend',
      skills: ["Node.js", "Express", "MongoDB"]
    },
    {
      category: 'Additional',
      skills: ["Git", "SQL"]
    }
  ];

  return (
    <>
    
      <main className='bg-[#edf2f7] py-10 px-4'>
        <ScrollReveal>
          <section className="flex flex-col gap-8 mt-5 lg:flex-row xl:ml-20">
            <div className="min-h-65">

                {/* TITLE */}
                <div className="flex size-fit mb-8">
                  <h2 className="font-semibold text-courier text-2xl underline underline-offset-8 md:text-3xl">
                    Skills & Technologies
                  </h2>
                </div>

                {/* CARDS */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 max-w-275 mx-auto">
                  {cardsData.map((item, index) => (
                    <div 
                      key={index}
                      className={`bg-[#202020] w-2xs h-37 border-2 rounded-2xl border-blue-700`}
                    >        
                      <h3 className="text-lg text-white font-bold size-fit mt-2 ml-5">{item.category}</h3>
                      <div className="flex flex-wrap gap-x-2 gap-y-3 mt-5 ml-5">  
                      {item.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-4 py-1 text-xs font-semibold lowercase bg-transparent text-white border-2 border-blue-500 rounded-full tracking-wider">
                          {skill}
                        </span>
                      ))}
                      </div>
                    </div>  
                  ))} 
                </div>
            </div>
          </section>
        </ScrollReveal>
        {/* SECTION TO SHOW EXPERIENCES */}
        <ExpSection />
      </main>
    </>
  )
}