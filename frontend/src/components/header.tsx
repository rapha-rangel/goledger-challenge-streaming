import { VscAccount } from "react-icons/vsc";
import { IoSearch } from "react-icons/io5";
import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import Input from "./input";
import { useOpenModal } from "@/hooks/useOpenModal";
import { DisplayInfoTypes } from "@/types/display-info-types";
import { ActionModalTypes } from "@/types/action-modal-types";
interface HeaderProps{
  searchText:string
  setSearchText:Dispatch<React.SetStateAction<string>>
  setLoadingDisplayIsTrue:Dispatch<React.SetStateAction<boolean>>
  setUpdateDisplayInfo:Dispatch<React.SetStateAction<boolean>>

}
export default function Header ({setUpdateDisplayInfo,setSearchText, setLoadingDisplayIsTrue }: HeaderProps){
  const [inputValue, setInputValue] = useState("");
  const {showOrNotModal} = useOpenModal()

	useEffect(()=>{
    setLoadingDisplayIsTrue(true);
		const handler = setTimeout(() => {
      setSearchText(inputValue);
      setUpdateDisplayInfo(prev=> !prev);
    }, 200);
	return () => {
			clearTimeout(handler);
	};
	},[inputValue] )

  const handleSearchInput=(e:ChangeEvent<HTMLInputElement>)=>{
    setInputValue(e.target.value);
  }
  return(
    <section className="p-4 w-[85%] left-[15%] fixed z-30 flex justify-center bg-[#0F0D13] border-b-[1px] border-[#555257]">
      <div className="flex relative w-[500px]">
        <IoSearch
          className="absolute left-2 border-l-1 border-white text-[2rem] text-white top-[50%] -translate-y-[50%]"/>
        <Input disabled={false} handleSearchInput={(e)=>handleSearchInput(e)} inputValue={inputValue} placeholder={"Busca"} formatPadding={"search"}/>
          <div className="pl-4 absolute right-2 border-l-2 border-[#656565] text-[2rem] text-white top-[50%] -translate-y-[50%]">
            <span className="group">
              <VscAccount 
                onClick={()=>showOrNotModal(true,DisplayInfoTypes.SONG, ActionModalTypes.CREATE)}
                className="group text-[#656565] hover:text-white cursor-pointer transition-all ease-in-out duration-200"/>
              <p className="absolute hidden p-2 bg-[#29282D] text-white group-hover:block text-[0.8rem] w-[90px] mt-2 left-[50%] -translate-x-[50%] ">Criar Artista</p>
            </span>
          </div>
      </div>
    </section>
  )
}