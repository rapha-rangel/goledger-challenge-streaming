import { DisplayInfoTypes } from "@/types/display-info-types"
import login from '../assets/login.png'


interface ListProps{
  index:number
  inf:any
  handleClick:any
  type:DisplayInfoTypes
}

export default function List({index, inf, handleClick, type}: ListProps){
  return(
    <li
      key={index}
      onClick={()=>handleClick(inf['@key'])}  
      className={`flex flex-col p-4 gap-[25px] w-[255px] rounded-md  transition-all ease-in-out duration-200 hover:bg-[rgba(0,0,0,0.8)]`}>
      <img className="rounded-md w-full" src={login.src} alt="image"/>
      <div className="flex flex-col">
        <span className="text-white text-[1.2rem]">{inf.name}</span>
        {type ===DisplayInfoTypes.ALBUM?
          <span className="text-gray-400 text-[0.9rem]">{inf.artist.name}</span>
        :type ===DisplayInfoTypes.PLAYLIST  ?
          <div className="flex">
            {inf.songs.length> 0 ?
              <span className="text-gray-400 text-[0.9rem] ">Aqui tem
                {inf.songs.slice(0,3).map((song: any, index:number)=>(
                  <span key={index}> {song.artist.name}{index+1 !==inf.songs.slice(0,3).length?",":null} </span>
                ))}
              </span>
            :null}
          </div>
        : <span className="text-gray-400 text-[0.9rem]">Artista</span>
        }
      </div>
    </li>
  )
}