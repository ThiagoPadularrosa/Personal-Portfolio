import webimg from '../../../assets/images/web.webp'
import data from '../../../assets/images/data.webp'
import torres from '../../../assets/images/torres.webp'
import ScrollReveal from '../../../components/ScrollReveal'



const cardsSkills = [
  {
    title: "Web Development",
    description: "I create responsive and also user-friendly websites using all the latest technologies with the frameworks too.",
    image: webimg, // At the hour of import a varible with the img, it should be used as a no-string, because if i use strings it will not be possible to show the img
  },
  {
    title: "Web & UX/UI Design",
    description: "I build a website with a clear and simple design for a good user experience.",
    image: data,
  },
  {
    title: "Backend Development",
    description: "I create a backend for your website with everything that you need to make work all the functions of your website, with a database and server-side.",
    image: torres,
  }
]

export default function MainSection() {
  return (
    <ScrollReveal>
      <div className="py-4">
        <main className="flex flex-col flex-1 w-full overflow-hidden gap-y-12 max-w-7xl m-auto mx-auto p-4">
          <section className="bg-[#edf2f7] px-[3%] py-16">
            <div className="max-w-6xl mx-auto size-fit">
              <div className="text-center mb-10">
                <h1 className="font-courier text-[#1a1a2e] text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-4xl tracking-wide mb-2">
                  What i do
                </h1>
                <span className="block w-15 h-0.75 bg-[#4a9eff] mx-auto rounded-full"></span>
              </div>
              {/* CARDS */}
              <div className="grid grid-cols-1 gap-4 mt-8 mx-auto md:grid-cols-3">
                {cardsSkills.map(({ title, description, image }) => (
                  <div 
                    key={title}
                    className={`flex-1 bg-white border-2 border-gray-300 rounded-md`}
                  >
                    <div className="max-w-full overflow-hidden relative isolate md:h-50">
                      <img 
                        loading='lazy' 
                        src={image} alt={title} 
                        decoding='async'
                        className="object-cover object-center size-full max-w-full"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl font-black mb-2 underline md:text-2xl">{title}</h2>
                      <p className="text-gray-600">{description}</p>
                    </div>
                  </div>
                ))}    
              </div>
            </div>
          </section>
        </main>
      </div>
    </ScrollReveal>
  )
}