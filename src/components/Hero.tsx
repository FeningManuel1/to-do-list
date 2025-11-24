function Hero({ bgImage, themeIcon, onThemeClick, children }: any) {
  return (
    <div className="relative h-[30vh]" >
      {/* background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      
      {/* overlay gradient */}
      <div className="inset-0 bg-gradient-to-r from-purple-900/70 to-blue-700/40"></div>
      
      {/* content */}
      <div className="relative h-full mx-auto p-6 max-w-lg flex flex-col justify-center gap-6">
        {/* header with title and theme button */}
        
        <div className="flex justify-between mb-6 mt-10">
          <h1 className="text-4xl font-bold tracking-widest text-white">TODO</h1>
          <button 
            onClick={onThemeClick}
            className="flex items-center p-2 h-10 w-10 "
          >
            <img src={themeIcon} alt="theme toggle" className="h-full w-full bg-contain" />
          </button>
        </div>
        
        
        {/* children (input card) */}
        {children}
      </div>
    </div>
  )
}

export default Hero
