export default function Hero() {
  return (
    <>
      <section className="bg-white min-h-85 flex flex-col justify-between px-[5%] py-16 gap-8 animate-fade-in md:flex-row ">
        <div className="max-w-140 size-fit">
          <h1 className="font-bold text-5xl text-black mb-3 font-courier md:text-6xl">About Me</h1>
          <p className="text-wrap whitespace-pre-line text-black">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. 
            Ex sapien vitae pellentesque sem placerat in id. 
            Pretium tellus duis convallis tempus leo eu aenean. 
            Urna tempor pulvinar vivamus fringilla lacus nec metus. 
            Iaculis massa nisl malesuada lacinia integer nunc posuere. 
            Semper vel class aptent taciti sociosqu ad litora.
            <br/>
            <br/>
            Conubia nostra inceptos himenaeos orci varius natoque penatibus. 
            Dis parturient montes nascetur ridiculus mus donec rhoncus. 
            Nulla molestie mattis scelerisque maximus eget fermentum odio. 
            Purus est efficitur laoreet mauris pharetra vestibulum fusce.
          </p>
        </div>
        <div className="relative bg-[#edf2f7] shrink-0 w-70 max-w-100 h-full lg:w-80">
          <img 
          loading="eager" 
          fetchPriority="high" 
          src="/images/isagi2.webp" alt="Me squizophrenic asf" 
          className="block w-full h-auto object-cover" />
        </div>
      </section>
    </>
  )
}