import { DisplayInfoTypes } from "@/types/display-info-types"
import { ChangeEventHandler} from "react"

interface InputProps{
  handleSearchInput:ChangeEventHandler<HTMLInputElement>
  placeholder: string
  formatPadding: string
}

export default function Input({handleSearchInput, placeholder, formatPadding, }:InputProps){
  return(
    <input
      onChange={handleSearchInput}
      placeholder={placeholder}
      className={`${formatPadding ==="search"?"pl-[50px] pr-[70px]":"px-[15px]"}
        placeholder:text-[#656565] placeholder:font-light outline-none bg-[#29282D] w-[500px] py-[12px] text-[1rem] 
      shadow-[inset_0px_4px_4px_0px_#00000040] rounded-[10px]  font-light text-white
        `}
      type="text"/>
  )
}