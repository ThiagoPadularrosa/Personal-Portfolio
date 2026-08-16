import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBriefcase, faLocationDot, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import ContactForm from './ContactForm.jsx'
import ErrorBoundary from '../../../components/ErrorBoundary.jsx';
import Notification from '../../../components/Notification.jsx';

export default function MainContent() {
  return (
    <>
      <main className="bg-[#edf2f7] px-0 py-16">
        <section className="flex! flex-col lg:grid! lg:grid-cols-[0.50fr_1fr]! py-0 px-4 min-[370px]:px-8 size-full! items-start">
          <div className="flex h-fit w-full lg:justify-end lg:items-end">
            <div className="h-fit items-center pb-4 lg:py-4 lg:px-4">
              <div className="size-fit md:pt-8">
                <FontAwesomeIcon icon={faEnvelope} size='2x'></FontAwesomeIcon>
              </div>
              <h2 className='size-fit normal-case font-bold text-[1.4rem] leading-[1.3] min-[372px]:max-[2560px]:text-[1.5rem]'>For commissions and<br/> project inquiries,<br /> please email:</h2>
              <a href="#" className="block underline text-[1.3rem] font-bold text-blue-500 hover:text-blue-700 pb-[0.6rem] w-fit">titirojo01@gmail.com</a>
              <p className="text-[1.25rem] text-bold text-[#0d0d0d] w-fit">or send a message via this form</p>
              <p className='contact-background text-base sm:max-lg:text-lg lg:max-[2560px]:text-[1rem] xl:max-w-80'>
                <FontAwesomeIcon icon={faBriefcase} size='1x' className='size-fit'></FontAwesomeIcon>
                Open for Remote work
              </p>
            </div>
          </div>
          <ErrorBoundary>
            <ContactForm />
          </ErrorBoundary>
        </section>
      </main>
    </>
  )
}