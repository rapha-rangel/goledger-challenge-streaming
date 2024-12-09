'use client'

import { ActionModalTypes } from '@/types/action-modal-types';
import { DisplayInfoTypes } from '../types/display-info-types';
import {createContext, useState, ReactNode} from "react";

export const OpenModalContext = createContext({
  openModal:false,
  typeModal:DisplayInfoTypes.ALL,
  typeActionModal:ActionModalTypes.CREATE,
  showOrNotModal:(isOpen: boolean, type:DisplayInfoTypes, action:ActionModalTypes)=>{},
  openAlert: {
    title:"", content:"", colorAlert:"", isOpen:false
  },
  showAlert:(value:{title:string, content:string, colorAlert:string, isOpen:boolean})=>{},
  hiddenAlert:()=>{}
})

interface ProviderProps{
  children: ReactNode
}

export function OpenModalContextProvider({children}: ProviderProps){

  const [openModal, setOpenModal] = useState(false);
  const [typeActionModal, setTypeActionModal] =useState(ActionModalTypes.CREATE);
  const [openAlert, setOpenAlert] = useState({
    title:"", content:"", colorAlert:"", isOpen:false
  });
  const [typeModal, setTypeModal] = useState(DisplayInfoTypes.ALL);

  const showOrNotModal =( isOpen: boolean,type:DisplayInfoTypes, action:ActionModalTypes)=>{
    setOpenModal(isOpen);
    setTypeModal(type);
    setTypeActionModal(action)
  }

  const showAlert=(value:{
    title:string
    content:string,
    colorAlert:string
    isOpen:boolean
  })=>{
    setOpenAlert(value)
  }

    const hiddenAlert=()=>{
      setOpenAlert({...openAlert,isOpen:false})
  }

  return (
    <OpenModalContext.Provider
      value={{
        openModal,
        showOrNotModal, typeModal,typeActionModal,
        showAlert,hiddenAlert,openAlert
      }}
    >
      {children}
    </OpenModalContext.Provider>
  )
}