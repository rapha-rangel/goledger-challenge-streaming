import { VscLoading } from "react-icons/vsc"

interface ButtonProps{
  type:"button"|"submit"
  name: string
  loading:boolean
  handleClick:()=>void
}

export default function Button({type, name,loading,handleClick}:ButtonProps){
  return(
    <button
      onClick={handleClick}  
      type={type} 
      className="border-[1px] w-[100px]  font-semibold text-[1rem] p-3 rounded-md border-[#555257] text-white bg-orange-400 hover:bg-orange-300">
      {loading===true?
        <VscLoading className=" w-full  animate-spin text-[1.4rem] text-white "/>
      :
        <>
          {name}
        </>
    }
    </button>
  )
}