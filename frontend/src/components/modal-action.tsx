import { useOpenModal } from "@/hooks/useOpenModal";
import Input from "./input";
import { DisplayInfoTypes } from "@/types/display-info-types";
import Switch from "./swicth";
import Select from "./select";
import { ChangeEvent, ChangeEventHandler, Dispatch, FormEvent, useEffect, useState } from "react";
import { createAlbum, createArtist, createPlaylist, createSong, getAlbumByArtist, getAllArtists, updateArtist, updateSong } from "@/api";
import Button from "./button";
import { useInfoDisplay } from "@/hooks/useInfoDisplay";
import { ActionModalTypes } from "@/types/action-modal-types";

interface ModalActionProps{
  setUpdateDisplayInfo: Dispatch<React.SetStateAction<boolean>>
}

export default function ModalAction({setUpdateDisplayInfo}:ModalActionProps ){
  const {openModal,typeActionModal, showOrNotModal, typeModal, showAlert} = useOpenModal();
  const {allArtists, selectedArtist,setAllArtists,setSelectedArtist, setSelectedAlbum,
    selectedAlbum, inputValue1,setInputValue1,setInputValue2, setAlbumsByArtist,
    inputValue2, albumsByArtist,setLoadingButton, setIsPrivatePlaylist,
    loadingButton, isPrivatePlaylist
  } = useInfoDisplay();
  console.log(selectedAlbum)

  const fetchArtists =async ()=>{
    const allArtist = await getAllArtists("",0);
    setAllArtists(allArtist)
  }

  const fetchArtistsAndAlbunsByArtist= async(key:string)=>{
    console.log(key)
    if(key !=="") {
      const res = await getAlbumByArtist(key);
      if(res) setAlbumsByArtist(res)
    }
  }

  useEffect(()=>{
    if(typeModal ===DisplayInfoTypes.ALBUM ||typeModal ===DisplayInfoTypes.SONG){
      fetchArtists();
    } 

  },[openModal])

  useEffect(()=>{
    if(typeModal===DisplayInfoTypes.SONG && typeActionModal ===ActionModalTypes.UPDATE && selectedArtist.length===2){
      fetchArtistsAndAlbunsByArtist(selectedArtist[0])
    }
  },[selectedArtist])

  const handleSelect =(event:ChangeEvent<HTMLSelectElement>)=>{
    setSelectedArtist([event.target.value.split(",")[0], event.target.value.split(",")[1]])
    if(typeModal === DisplayInfoTypes.SONG){
      fetchArtistsAndAlbunsByArtist(event.target.value.split(",")[0])
    }
  }

  const handleInput1=(e:ChangeEvent<HTMLInputElement>)=>{
    setInputValue1(e.target.value);
  }
  const handleInput2=(e:ChangeEvent<HTMLInputElement>)=>{
    setInputValue2(e.target.value);
  }

  const handleSelectAlbum =(event:ChangeEvent<HTMLSelectElement>)=>{
    setSelectedAlbum([event.target.value.split(",")[0], event.target.value.split(",")[1]])
  }

  const handleSwicth =()=>{
    setIsPrivatePlaylist(prev=>!prev)
  }

  const handleBack =()=>{
    showOrNotModal(false, typeModal,typeActionModal );
    setTimeout(()=>{
      setSelectedArtist([]);
      setSelectedAlbum([]);
      setInputValue1("") ;
      setInputValue2("");
      setIsPrivatePlaylist(false);
      setLoadingButton(false);
    },1000)
  }

  const handleSubmit=async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setLoadingButton(true);
    if(typeActionModal === ActionModalTypes.CREATE){
      if(typeModal ===DisplayInfoTypes.ARTIST){
        await createArtist(inputValue1, inputValue2, showAlert ,handleBack, setLoadingButton, setUpdateDisplayInfo);
      } else
      if(typeModal ===DisplayInfoTypes.PLAYLIST){
        await createPlaylist(inputValue1, isPrivatePlaylist, showAlert ,handleBack, setLoadingButton, setUpdateDisplayInfo);
      }
      if(typeModal ===DisplayInfoTypes.ALBUM){
        await createAlbum(inputValue1, inputValue2, selectedArtist[1], showAlert ,handleBack, setLoadingButton, setUpdateDisplayInfo);
      }
      if(typeModal ===DisplayInfoTypes.SONG){
        await createSong(inputValue1, selectedArtist[1], selectedAlbum[1], showAlert ,handleBack, setLoadingButton, setUpdateDisplayInfo);
      }
    } else if(typeActionModal === ActionModalTypes.UPDATE){
      if(typeModal ===DisplayInfoTypes.ARTIST){
        await updateArtist(inputValue1, inputValue2, showAlert ,handleBack, setLoadingButton, setUpdateDisplayInfo);
      } else
      if(typeModal ===DisplayInfoTypes.PLAYLIST){
        await createPlaylist(inputValue1, isPrivatePlaylist, showAlert ,handleBack, setLoadingButton, setUpdateDisplayInfo);
      }
      if(typeModal ===DisplayInfoTypes.ALBUM){
        await createAlbum(inputValue1, inputValue2, selectedArtist[1], showAlert ,handleBack, setLoadingButton, setUpdateDisplayInfo);
      }
      if(typeModal ===DisplayInfoTypes.SONG){
        await updateSong(inputValue1, selectedArtist[1], selectedAlbum[1], showAlert ,handleBack, setLoadingButton, setUpdateDisplayInfo);
      }
    } else{

    }
    
  }

  return(
    <section>
      <form onSubmit={(e)=>handleSubmit(e)} method="POST"
        className={`${openModal?" -translate-y-[50%] z-40 opacity-100 ":"-translate-y-[0%] opacity-0 z-0" }
          fixed bg-[#1B191F] top-[50%] left-[50%] -translate-x-[50%] p-16 rounded-md border-[1px] border-[#555257] transition-all ease-in-out duration-[1000ms]`}>
        {typeActionModal ===ActionModalTypes.DELETE?
        <>
          <h3 className="text-white text-[2rem] mb-8 font-semibold">Você tem certeza que quer deletar o artista {selectedArtist[1]}?</h3>
        </>
        :typeModal ===DisplayInfoTypes.ARTIST?
          <>
            <h3 className="text-white text-[2rem] mb-8 font-semibold">
              {typeActionModal ===ActionModalTypes.CREATE?"Criar Artista":"Atualizar Artista"}
            </h3>
            <div className="flex flex-col gap-8">
              <Input disabled={typeActionModal===ActionModalTypes.UPDATE} handleSearchInput={handleInput1} inputValue={inputValue1}  placeholder={"Nome do artista"} formatPadding={"modal"}/>
              <Input disabled={false} handleSearchInput={handleInput2} inputValue={inputValue2} placeholder={"País do artista"} formatPadding={"modal"}/>
            </div>
          </>
        :
        typeModal ===DisplayInfoTypes.PLAYLIST?
        <>
          <h3 className="text-white text-[2rem] mb-8 font-semibold">
            {typeActionModal ===ActionModalTypes.CREATE?"Criar Playlist":"Atualizar Playlist"}
          </h3>
          <div className="flex flex-col gap-8">
            <Input disabled={false} handleSearchInput={handleInput1}  inputValue={inputValue1} placeholder={"Nome da playlist"} formatPadding={"modal"}/>
            <Switch
              check={isPrivatePlaylist}
              handleSwicth={handleSwicth}/>
          </div>
          </>
        :
        typeModal ===DisplayInfoTypes.ALBUM?
        <>
          <h3 className="text-white text-[2rem] mb-8 font-semibold">
          {typeActionModal ===ActionModalTypes.CREATE?"Criar Album":"Atualizar Album"}
          </h3>
          <div className="flex flex-col gap-8">
            <Input disabled={false} handleSearchInput={handleInput1}  inputValue={inputValue1} placeholder={"Nome do album"} formatPadding={"modal"}/>
            <Input disabled={false} handleSearchInput={handleInput2} inputValue={inputValue2} placeholder={"Ano do album"} formatPadding={"modal"}/>
            <Select
              label={"Selecione um artista"}
              disabled={false}
              value={selectedArtist[1]}
              handleSelect={handleSelect}
              allData={allArtists}/>
          </div>
          </>
        :
        typeModal ===DisplayInfoTypes.SONG?
         <>
          <h3 className="text-white text-[2rem] mb-8 font-semibold">
            {typeActionModal ===ActionModalTypes.CREATE?"Criar Música":"Atualizar Música"}
          </h3>
          <div className="flex flex-col gap-8">
            <Input disabled={typeActionModal===ActionModalTypes.UPDATE} handleSearchInput={handleInput1} inputValue={inputValue1} placeholder={"Nome da música"} formatPadding={"modal"}/>
            <Select
              label={"Selecione um artista"}
              disabled={false}
              handleSelect={handleSelect}
              value={selectedArtist[1]}
              allData={allArtists}/>
            <Select
              label={"Selecione um album"}
              disabled={false}
              value={selectedAlbum[1]}
              handleSelect={handleSelectAlbum}
              allData={albumsByArtist}/>
          </div>
          </>
        :null}
        <div className="flex justify-between mt-12">
        <Button
          type="submit"
          name={typeActionModal ===ActionModalTypes.CREATE?"Criar":typeActionModal ===ActionModalTypes.UPDATE?"Atualizar":"Deletar"}
          loading={loadingButton}
          handleClick={()=>{}}/>
        <Button
          type="button"
          name="Voltar"
          loading={false}
          handleClick={handleBack}/>
        </div>
      </form>
    </section>
  )
}
