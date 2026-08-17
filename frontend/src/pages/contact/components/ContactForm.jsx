import { useState } from 'react';
import clsx from 'clsx';
import Notification from '../../../components/Notification';
import useFrontendValidation from '../../../hooks/useFrontendValidation';

export default function FormContact() {

  const { 
    formData,
    notification,
    error,
    errors,
    hasError,
    handleInputChange,
    handleSubmit, } =  useFrontendValidation();

  return (
    <>
      <form onSubmit={handleSubmit} action={`${import.meta.env.VITE_API_URL}/api/data`} method='POST' className='block size-fit' noValidate >
        <div className="flex flex-col items-baseline lg:pl-12">
          <div className="flex flex-col max-w-171.25 py-4 px-0 gap-3">
            <h3 className='font-courier text-[#1a1a2e] font-bold w-fit text-[2.5rem] text-left lg:text-7xl'>
              Contact Me
            </h3>
            <p className='text-2xl text-left lg:text-2xl font-medium text-[#0d0d0d]'>
              If you want to hire me, ask some questions, or need my help,
              send me a message — I'm here to help.
            </p>
            <p className='text-base font-semibold font-montserrat pt-4 text-[#0d0d0d] text-left'>
              Before sending your message, follow me in my 
              <a href="" target="_blank" className='form-links'> socials</a> for more information
              and free value. You can also check my other <a href="/projects" target="_blank" className='form-links'>
              projects.</a>
            </p>
          </div>
 
          {/* TEXTBOXES */}
          <div className='flex flex-col'>
              <div className="w-full md:max-w-171.25">
                <label htmlFor="username" className='font-bold'>First Name</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full md:max-w-171.25 ${errors.username ? 'input-invalid' : ''}`}
                  placeholder='Name'
                  autoComplete='given-name'
                  required
                />
              </div>
              <div className='pt-4 md:max-w-171.25'>
                <label htmlFor="lastname" className='font-bold'>Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className={`w-full md:max-w-171.25 ${errors.lastname ? 'input-invalid' : ''}`}
                  placeholder="Last name" 
                  autoComplete="family-name"
                  required />
              </div>
              <div className="pt-4 md:max-w-171.25">
                <label htmlFor="useremail" className='font-bold'>Your email address
                  <span className='font-normal!'> (so i can reply to you)</span>
                  {error && <span className='text-[red] text-[1.2rem]'> {error}</span>}
                </label>
                <input
                  type="email"
                  id="useremail"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full md:max-w-171.25 ${errors.email ? 'input-invalid' : ''}`}
                  placeholder="Email address"
                  autoComplete="email"
                  autoCapitalize="off"
                  required />
              </div>
              <div className="pt-4 md:max-w-171.25">
                <label htmlFor="message" className='font-bold'>Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full md:max-w-171.25 ${errors.message ? 'input-invalid' : ''}`}
                  id="message"
                  rows={12}
                  cols={40}
                  required
                  placeholder='Include as much detail as you can'></textarea>
                <p className="text-sm font-semibold text-left text-[#0d0d0d]">
                  Upload files (screenshots, screen recordings, crash logs) to a service like
                  <a href="https://www.dropbox.com" target="_blank" className='form-links'> Dropbox</a>,
                  <a href="https://www.drive.google.com" target="_blank" className='form-links'> Google Drive</a>,
                  <a href="https://www.onedrive.com" target="_blank" className='form-links'> OneDrive</a>, or
                  <a href="https://www.wetransfer.com" target="_blank" className='form-links'> WeTransfer </a>
                  and paste the share links above. Make sure to set your permissions so I
                  can access them — all files are 100% confidential.
                </p>
              </div>
              <div className="size-fit mb-6 mt-8">
                <label htmlFor="checkbox" className="flex! flex-row! items-center! text-[1rem] gap-2!">
                  <input
                    type="checkbox"
                    id="checkbox"
                    name="checkbox"
                    checked={formData.checkbox}
                    onChange={handleInputChange}
                    className={` ${errors.checkbox ? 'input-invalid' : ''}`}
                    required />
                  I've read and agree to the Privacy Policy.
                </label>
              </div>
              <button type='submit' id='submit-btn' className='form-btn hover:bg-pink-700 hover:opacity-100'>Send</button>
              {/* Rendering Notification messages */}
              <Notification notification={notification} />
          </div>
        </div>
      </form>
    </>
  )
}