import { AllArtistTypes } from "@/types/api-response-types"
import { ChangeEventHandler } from "react"

interface SelectProps{
  allData:any[]
  handleSelect:ChangeEventHandler<HTMLSelectElement>
  disabled: boolean
  label:string
  value:string
}

export default function Select({allData,handleSelect, disabled, label, value}:SelectProps){
  console.log(value)
  return(
    <div className="w-full">
    <select
      value={value}
      disabled={disabled}
      onChange={handleSelect}
      id="names" className="bg-[#29282D] text-[1rem] border border-orange-500 text-white rounded-md focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 select:border-orange-500 ">
      <option value={""}>{value?value:label}</option>
      {allData && allData.map((artist:AllArtistTypes, index: number)=>(
        <option key={index}  value={[artist['@key'], artist.name]} >{artist.name}</option>
      ))}
    </select>
</div>
  )
}