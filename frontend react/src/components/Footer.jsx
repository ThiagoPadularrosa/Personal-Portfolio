import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSketch, faFacebookF, faXTwitter } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {

const socials = [
  { label: <FontAwesomeIcon icon={faFacebookF}/>,  href: 'https://www.facebook.com/TatoCSV/', target: '_blank', className: 'bg-[#1877f2]', title: 'Facebook' },
  { label: <FontAwesomeIcon icon={faXTwitter}/>,  href: 'https://x.com', target: '_blank', className: 'bg-black', title: 'X' },
  { label: 'Bē', href: 'https://behance.net', target: '_blank', className: 'bg-[#1769ff]', title: 'Behance' },
  { label: 'in', href: 'https://linkedin.com', target: '_blank', className: 'bg-[#0a66c2]', title: 'LinkedIn' },
  { label: <FontAwesomeIcon icon={faSketch}/>,  href: 'https://sketch.com', target: '_blank', className: 'bg-[#4a9eff]', title: 'Sketch' },
]

  return (
<>
  <hr className="text-[#0d0d0d] m-auto bg-[#f1f5f8]"/>
  <div className="pt-2 px-8">
    <footer className="min-[320px]:max-md:flex min-[320px]:max-md:flex-col min-[320px]:max-sm:items-center flex bg-white lg:flex md:justify-between">
      <a href="/home" className="font-semibold text-[2rem] text-[#1a1a3a] no-underline max-lg:mb-6">
        Tato <span className="text-blue-500">CSV</span>
      </a>
      <nav className="sm:flex m-0 p-0 text-[3.5rem]">
        {/* Social icons */}
        <div className=" min-[320px]:flex gap-3 items-center">
          {socials.map((s) => (
            <a
              key={s.title}
              href={s.href}
              target={s.target}
              title={s.title}
              className={`${s.className} text-white w-9 h-9 flex items-center justify-center rounded-full text-[0.8rem] font-bold no-underline transition-transform hover:scale-110 hover:opacity-85`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>
      <p className="items-center pb-4 mt-5 text-[#1a1a3a] text-[0.8rem] md:text-[0.9rem]">
        &copy; 2026 My Portfolio. All rights reserved.
      </p>
    </footer>
    </div>
    </>
  )
}