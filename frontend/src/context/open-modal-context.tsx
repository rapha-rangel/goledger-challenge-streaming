'use client'
import { DisplayInfoTypes } from '../types/display-info-types';
import {createContext, useState, ReactNode} from "react";


export const OpenModalContext = createContext({
  openModal:false,
  typeModal:DisplayInfoTypes.ALL,
  showOrNotModal:(action: boolean, type:DisplayInfoTypes)=>{},
})

interface ProviderProps{
  children: ReactNode
}

export function OpenModalContextProvider({children}: ProviderProps){

  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState(DisplayInfoTypes.ALL)

  const showOrNotModal =(action: boolean, type:DisplayInfoTypes)=>{
    setOpenModal(action);
    setTypeModal(type);
  }

  return (
    <OpenModalContext.Provider
      value={{
        openModal,
        showOrNotModal, typeModal
      }}
    >
      {children}
    </OpenModalContext.Provider>
  )
}