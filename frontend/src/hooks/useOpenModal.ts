import { OpenModalContext } from "../context/open-modal-context";
import { useContext } from "react";

export function useOpenModal(){
  return useContext(OpenModalContext)
}