function Hero({ bgDesktop, bgMobile, themeIcon, onThemeClick, children }: any) {
  return (
    <div className="relative h-[30vh]" >
      {/* background image */}
      <picture className="absolute inset-0">
        <source media="(min-width: 768px)" srcSet={bgDesktop} />
        <img 
          src={bgMobile}
          alt=""
          className="h-full w-full object-cover"
        />
      </picture>
      
      {/* content */}
      <div className="relative h-full mx-auto p-2 max-w-lg flex flex-col justify-center gap-6">
        <div className="flex justify-between mb-6 mt-10">
          <h1 className="text-4xl font-bold tracking-widest text-white">TODO</h1>
          <button 
            onClick={onThemeClick}
            className="flex items-center p-2 h-10 w-10 "
          >
            <img src={themeIcon} alt="theme toggle" className="h-full w-full bg-contain" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Hero