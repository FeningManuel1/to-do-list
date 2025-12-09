function TodoInputCard({ isDark, value, onChange, onAdd }: any) {
  // handle form submit
  function handleSubmit(e: any) {
    e.preventDefault()
    onAdd()
  }

  // styles for dark/light mode
  
  const inputBg = isDark ? 'bg-slate-900/60' : 'bg-slate-50'
  const textColor = isDark ? 'text-white' : 'text-slate-900'
  const borderColor = isDark ? 'border-slate-700' : 'border-slate-300'

  return (
    <form 
      onSubmit={handleSubmit}
      
    >
      <div className={`mx-auto -mt-6 max-w-lg flex justify-between gap-2`}>
     <div className={`w-full  p-4 rounded  ${inputBg} ${borderColor}`}>
          <div className={`flex items-center gap-2`}>
            <div className="rounded-full h-6 w-6 border border-light-greyish-blue dark:border-darker-greyish-blue hover:bg-light-greyish-blue-hover-dark dark:hover:bg-dark-greyish-blue-dark"></div>

          <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Create a new todo..."
          className={`${textColor} placeholder:text-slate-500 w-full outline-none dark:bg-darker-desaturated-blue-dark dark:text-light-greyish-blue-dark `} 
        />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-full bg-indigo-500 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
        >
          Add
        </button>
        </div>    
    </form>
  )
}

export default TodoInputCard
