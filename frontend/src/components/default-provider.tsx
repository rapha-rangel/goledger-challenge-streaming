import {ReactNode} from "react";
import { OpenModalContextProvider } from "../context/open-modal-context";
import { InfoDisplayContextProvider } from "@/context/info-display-context";

interface DefaultProviderProps {
  children: ReactNode;
}

export function DefaultProvider({children}: DefaultProviderProps) {
  return (
    <OpenModalContextProvider>
      <InfoDisplayContextProvider>
        {children}
      </InfoDisplayContextProvider>
    </OpenModalContextProvider>
  )
}