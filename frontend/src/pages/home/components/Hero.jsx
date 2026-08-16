import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBriefcase, faLocationDot, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

export default function Hero() {
  return (
    <>
      <section className="bg-white min-h-85 flex items-center flex-col justify-between px-[5%] py-16 gap-8 animate-fade-in md:flex-row">
        <div className="max-w-140 size-fit">
            <h1 className="text-[#1a1a2e] text-5xl font-courier size-fit font-bold tracking-wide">
              <span className="relative no-underline after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-1/2 after:bg-blue-500">
                HI THERE!
              </span>   
            </h1>
            <h2 className="text-[#1a1a2e] text-4xl font-courier font-bold size-fit mt-5">
              I'm Thiago Padularrosa
            </h2>
            <h3 className="flex justify-center w-55 text-white text-3xl font-bold font-courier bg-gray-600 mt-5 min-[522px]:w-100">
              Full Stack Developer
            </h3>
            <p className="text-black text-base whitespace-pre-line mt-10 sm:w-96">
              I build responsive websites with great details
              and attractiveness for businesses.
            </p>

            <div className="flex flex-col mt-8 min-[522px]:flex-row min-[522px]:gap-6 min-[522px]::items-center">
              <p className="heroAddressAndDisponibility text-base md:max-[869px]:text-sm size-fit">
                <FontAwesomeIcon icon={faLocationDot} size='1x' className='size-fit mr-2'></FontAwesomeIcon>
                Based in Argentina
              </p>
              <p className="heroAddressAndDisponibility text-base md:max-[869px]:text-sm size-fit">
                <FontAwesomeIcon icon={faLaptopCode} size='1x' className='size-fit mr-2'></FontAwesomeIcon>
                Available for Work
              </p>
            </div>

            <div className="flex flex-col size-fit self-center min-[522px]:flex-row min-[522px]:gap-10">
              <a 
                href="/contact"
                target='_blank'
                className="inline-block bg-[#2d3748] text-white px-8 py-3 mt-6 rounded-lg font-semibold text-[0.85rem] tracking-widest uppercase shadow-yellow transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-yellow-lg no-underline"
              >
                HIRE ME
              </a>
                
              <a 
                href="/projects"
                target='_blank'
                className="inline-block bg-[#2d3748] text-white px-8 py-3 mt-6 rounded-lg font-semibold text-[0.85rem] tracking-widest uppercase shadow-yellow transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-yellow-lg no-underline"
              >
                VIEW MY WORK
              </a>
            </div>
        </div>
        <div className="relative shrink-0 w-72 max-w-100 h-full lg:w-90">
          <img 
          loading='eager'
          fetchPriority='high' 
          src="/images/isagi.webp" 
          alt="Anime goat" 
          className="block w-full object-cover"/>
        </div>
      </section>
    </>
  )
}