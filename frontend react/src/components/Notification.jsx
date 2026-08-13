import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import checkmarkImg from '../assets/images/Check-mark.webp';

export default function Notification({ notification }) {
  return(
    <>
    { notification.isVisible && notification.status  === 'success' && (
    <figure className="fixed bottom-6 left-0 right-0 ml-auto mr-auto w-max bg-[#DCFCE7] shadow-[0_1px_10px_rgba(0,0,0,0.1)] rounded-lg backdrop-blur-[10px] z-5">
      <div className="flex justify-center items-center p-[1rem_8px]">
        <img src={checkmarkImg} alt="checkmark" className='size-6.5 mr-1' />
        <p className='m-0 text-[#065f46]'>Your form has been submitted! &#128640;</p>
      </div>
      <div className="absolute left-1 bottom-1 w-[calc(100%-8px)] h-0.75 scale-x-0 origin-left bg-linear-to-r from-green-900 to-green-400 rounded-[inherit] animate-[progress]"></div>
    </figure>
    )}
    { notification.isVisible && notification.status  === 'error' && (
    <figure className="fixed bottom-6 left-0 right-0 ml-auto mr-auto w-max bg-[#e10000] bg-clip-padding shadow-[0_1px_10px_rgba(0,0,0,0.1)] rounded-lg backdrop-blur-[10px] z-50">
      <div className="flex justify-center items-center p-[1rem_0.35rem_1rem_0.35rem] sm:p-[1rem_2rem_1rem_0.75rem] rounded-[inherit]"> 
        <FontAwesomeIcon icon={faTriangleExclamation} className="text-[1.3rem] text-white mr-2"/>
        <p className='text-sm text-white font-semibold m-0 whitespace-pre-line w-3xs max-w-xs sm:w-80 sm:max-w-sm'>
        Whoops! Looks like something's wrong with your
        submission. Please double check
        and try again.      
        </p>
      </div>
      <div className="absolute left-1 bottom-1 w-[calc(100%-8px) h-0.75 scale-x-0 origin-left bg-linear-to-r from-yellow-300 to-white rounded-[inherit] animate-[progress]"></div>
    </figure>
    )}
    </>
  )
}