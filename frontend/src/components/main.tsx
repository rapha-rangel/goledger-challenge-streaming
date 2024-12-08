"use client"

import { useState } from "react";
import DisplayInfo from "./display-info";
import DisplayPlaylist from "./display-playlist";
import Header from "./header";
import ModalCreateArtist from "./modal-create-artist";


export default function Main(){

  const [searchText, setSearchText] = useState("");
  const [updateDisplayInfo, setUpdateDisplayInfo ] = useState(false);
  const [loadingDisplayIsTrue, setLoadingDisplayIsTrue] = useState(false);
  return(
    <>
      <ModalCreateArtist/>
      <section className="relative flex min-h-[100vh] w-full bg-[#0F0D13] ">
      <DisplayPlaylist
        setUpdateDisplayInfo={setUpdateDisplayInfo}/>
        <div className="ml-[17.8rem] w-[85%]">
          <Header
            searchText={searchText} 
            setSearchText={setSearchText}
            setUpdateDisplayInfo={setUpdateDisplayInfo}
            setLoadingDisplayIsTrue={setLoadingDisplayIsTrue}/>
          <DisplayInfo
            updateDisplayInfo={updateDisplayInfo}
            loadingDisplayIsTrue={loadingDisplayIsTrue}
            searchText={searchText}
            setLoadingDisplayIsTrue={setLoadingDisplayIsTrue}/>
        </div>
      </section>
    </>
  )
}