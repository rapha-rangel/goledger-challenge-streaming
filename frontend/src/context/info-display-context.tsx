"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { AllArtistTypes } from "@/types/api-response-types";

interface InfoDisplayType {
  allArtists: AllArtistTypes[]; // Substitua `AllArtistTypes` pelo tipo correto
  selectedArtist: string[];
  selectedAlbum: string[];
  inputValue1: string;
  inputValue2: string;
  albumsByArtist: any[]; // Substitua `any` pelo tipo correto, se disponível
  isPrivatePlaylist: boolean;
  loadingButton: boolean;
  setAllArtists:(value:AllArtistTypes[])=> void
  setSelectedArtist:Dispatch<SetStateAction<string[]>>
  setSelectedAlbum:Dispatch<SetStateAction<string[]>>
  setInputValue1:(value:string)=>void
  setInputValue2:(value:string)=>void
  setAlbumsByArtist:(value:any[])=> void
  setLoadingButton:Dispatch<SetStateAction<boolean>>
  setIsPrivatePlaylist:Dispatch<SetStateAction<boolean>>
}

export const InfoDisplayContext = createContext<InfoDisplayType>({
  allArtists:[],
  selectedArtist: [],
  selectedAlbum: [],
  inputValue1:"",
  inputValue2: "",
  albumsByArtist:[],
  isPrivatePlaylist:false,
  loadingButton:false,
  setAllArtists:(value:AllArtistTypes[])=> {},
  setSelectedArtist:(value:SetStateAction<string[]>)=>{},
  setSelectedAlbum:(value:SetStateAction<string[]>)=>{},
  setInputValue1:(value:string)=>{}, 
  setInputValue2:(value:string)=>{},
  setAlbumsByArtist:(value:any[])=> {},
  setLoadingButton:(value:SetStateAction<boolean>)=>{}, 
  setIsPrivatePlaylist:(value: SetStateAction<boolean>)=>{}
})

interface ProviderProps{
  children: ReactNode
}

export function InfoDisplayContextProvider({children}: ProviderProps){
  
  const [allArtists , setAllArtists] = useState<AllArtistTypes[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string[]>([]);
  const [inputValue1, setInputValue1]= useState("");
  const [inputValue2, setInputValue2]= useState("")    
  const [albumsByArtist, setAlbumsByArtist] = useState<any>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [isPrivatePlaylist, setIsPrivatePlaylist] = useState(false)

  return(
    <InfoDisplayContext.Provider 
      value={{
        allArtists, selectedArtist,setAllArtists,setSelectedArtist, setSelectedAlbum,
        selectedAlbum, inputValue1,setInputValue1,setInputValue2, setAlbumsByArtist,
        inputValue2, albumsByArtist,setLoadingButton, setIsPrivatePlaylist,
        loadingButton, isPrivatePlaylist
      }}>
      {children}
    </InfoDisplayContext.Provider>
  )
}