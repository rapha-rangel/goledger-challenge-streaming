import { InfoDisplayContext } from "../context/info-display-context";
import { useContext } from "react";

export function useInfoDisplay(){
  return useContext(InfoDisplayContext)
}