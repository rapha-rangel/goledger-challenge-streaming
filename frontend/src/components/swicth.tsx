interface SwitchProps{
  handleSwicth:()=>void
  check:boolean
}

export default function Switch({handleSwicth,check}: SwitchProps) {
  return(
    <label className="inline-flex items-center cursor-pointer">
      <input checked={check}  onChange={handleSwicth} type="checkbox"  className="sr-only peer"/>
      <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-400"></div>
      <span className={`${check?"text-white": "text-[#656565]"} ml-4 text-[1rem] font-light `}  >Privado</span>
    </label>
  )
}