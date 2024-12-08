import { AllArtistTypes } from "@/types/api-response-types"
import { ChangeEventHandler } from "react"

interface SelectProps{
  allArtists:any[]
  handleSelect:ChangeEventHandler<HTMLSelectElement>
  disabled: boolean
}

export default function Select({allArtists,handleSelect, disabled}:SelectProps){
  console.log(allArtists)
  return(
    <form className="w-full">
    <label htmlFor="names" className="block mb-2 text-[1.2rem] font-light text-white">Selecione um Artista</label>
    <select
      disabled={disabled}
      onChange={handleSelect}
      id="names" className="bg-[#29282D] text-[1rem] border border-orange-500 text-white rounded-md focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 select:border-orange-500 ">
      <option selected value="">Selecione um artista</option>
      {allArtists && allArtists.map((artist:AllArtistTypes, index: number)=>(
        <option key={index} value={artist['@key']} >{artist.name}</option>
      ))}
    </select>
</form>
  )
}