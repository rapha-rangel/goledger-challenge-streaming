import { useOpenModal } from "@/hooks/useOpenModal";
import Input from "./input";
import { DisplayInfoTypes } from "@/types/display-info-types";
import Switch from "./swicth";
import Select from "./select";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { getAlbumByArtist, getAllArtists } from "@/api";
import {AllArtistTypes} from '../types/api-response-types'



export default function ModalCreateArtist(){
  const {openModal, showOrNotModal, typeModal} = useOpenModal();
  const [allArtists , setAllArtists] = useState<AllArtistTypes[]>([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [albumsByArtist, setAlbumsByArtist] = useState<any>([])

  const fetchArtists =async ()=>{
    const allArtist = await getAllArtists("",0);;
    setAllArtists(allArtist)
  }

  const fetchArtistsAndAlbunsByArtist= async(key:string)=>{
    await fetchArtists();
    if(key!=="") {
      const res = await getAlbumByArtist(key);
      console.log(res)
      setAlbumsByArtist(res)
    }
  }

  useEffect(()=>{
    if(typeModal ===DisplayInfoTypes.ALBUM){
      fetchArtists();
    } 
  },[openModal])

  const handleSelect =(event:ChangeEvent<HTMLSelectElement>)=>{
    setSelectedArtist(event.target.value)
    if(typeModal === DisplayInfoTypes.SONG){

      fetchArtistsAndAlbunsByArtist(event.target.value)
    }
  }

  const handleBack =()=>{
    showOrNotModal(false, DisplayInfoTypes.ALL)
    setSelectedArtist("")
  }

  return(
    <section>
      <form action={""} className={`${openModal?" -translate-y-[50%] z-40 opacity-100 ":"-translate-y-[0%] opacity-0 z-0" }
          fixed bg-[#1B191F] top-[50%] left-[50%] -translate-x-[50%] p-16 rounded-md border-[1px] border-[#555257] transition-all ease-in-out duration-[1000ms]`}>
        <h3 className="text-white text-[2rem] mb-8 font-semibold">Criar um Artista</h3>
        <div className="flex flex-col gap-8">
            <Input handleSearchInput={()=>{}} placeholder={"Nome do artista"} formatPadding={"modal"}/>
            {typeModal !==DisplayInfoTypes.SONG ?<Input handleSearchInput={()=>{}} placeholder={"País do artista"} formatPadding={"modal"}/>:null}
            {typeModal ===DisplayInfoTypes.PLAYLIST?<Switch/>:null}
            {typeModal ===DisplayInfoTypes.ALBUM||typeModal ===DisplayInfoTypes.SONG ?
              <Select
              disabled={false}
              handleSelect={handleSelect}
              allArtists={allArtists}/>:null}
            {typeModal ===DisplayInfoTypes.SONG ?
            <Select
            disabled={selectedArtist?false:true}
            handleSelect={handleSelect}
            allArtists={albumsByArtist}/>:null}
        </div>
        <div className="flex justify-between mt-12">
        <button type='submit' 
          className="border-[1px] font-semibold text-[1rem] p-3 rounded-md border-[#555257] text-white bg-orange-400 hover:bg-orange-300">Criar Artista
        </button>
        <button type='button'
          onClick={()=> handleBack()}
          className="border-[1px] text-[1rem] font-semibold p-3 rounded-md border-[#555257] text-white bg-orange-400 hover:bg-orange-300">Voltar
        </button>
        </div>
      </form>
    </section>
  )
}