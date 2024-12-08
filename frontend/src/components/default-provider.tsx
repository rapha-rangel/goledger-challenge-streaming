import {ReactNode} from "react";
import { OpenModalContextProvider } from "../context/open-modal-context";

interface DefaultProviderProps {
  children: ReactNode;
}

export function DefaultProvider({children}: DefaultProviderProps) {
  return (
    <OpenModalContextProvider>
      {children}
    </OpenModalContextProvider>
  )
}