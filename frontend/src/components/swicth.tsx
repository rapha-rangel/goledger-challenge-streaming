export default function Switch() {
  return(
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer"/>
      <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-400"></div>
      <span className=" ml-4 text-[1rem] font-light text-white ">Privado</span>
    </label>
  )
}