import { AiOutlineHome } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
interface DisplayPlaylistProps{
  setUpdateDisplayInfo:Dispatch<SetStateAction<boolean>>
  setSearchText:Dispatch<SetStateAction<string>>
}

export default function DisplayPlaylist({setUpdateDisplayInfo,setSearchText}: DisplayPlaylistProps) {

  const returnMainPage=()=>{
    setSearchText("");
    setUpdateDisplayInfo(prev=> !prev);
  }

  return(
    <section className={`fixed z-30 h-full w-[15%] bg-[#1B191F] border-r-[1px] border-[#555257]`}>
      <div className="p-4 text-white border-b-2 border-[#3A393D]">
        <h3 className="text-[2rem] font-bold mb-4">STREAMING</h3>
        <ul>
          <li
            onClick={returnMainPage}  
            className="flex text-[1.4rem] items-center gap-4 hover:bg-orange-500 cursor-pointer">
            <span><AiOutlineHome/></span> Início
          </li>
          <li className="flex text-[1.4rem] items-center gap-4">
            <span><FaRegHeart/></span> Favoritos
          </li>
        </ul>
      </div>
      <div className="flex flex-col  gap-[21px] p-4 "> 
        <div className="text-white flex justify-between text-[1.4rem]">
          <p>Playlist</p><span>+</span>
        </div>
        
        {/* filterFavoriteRadiosList && filterFavoriteRadiosList.map((radio:LocalStorageRadiosTypes)=>(
          <li key={radio.id} className={`flex group  bg-[#4D4D56] p-2 rounded-full shadow-[0px_0px_4px_2px_#4D4D56] md:mx-2
            ${openNavbar? "justify-between mx-4": "justify-center cursor-pointer ml-[4px]"}`}>
            <div className="flex gap-4 mr-auto ml-[1px]"
              onClick={playerInfo.id===radio.id && playing?()=>{}:()=> playRadioStation(radio.id, radio.nickname, radio.url, radio.img, radio.country) }
              >
              <div className="relative">
                <img src={imageNotFound(radio.img)} alt="select icon" className={`rounded-full max-w-[22px] max-h-[22px]  transition-all duration-250
                  ${playerInfo.id===radio.id && playing? "opacity-40":"opacity-100"}
                  ${openNavbar? "group-hover:opacity-100": "group-hover:opacity-40"}`}/>
                <FaPlay className={`cursor-pointer absolute left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] group-hover:opacity-100 transition-all duration-250 
                  ${playerInfo.id===radio.id && playing? "opacity-100 text-iconsColor":"opacity-0 text-white"}`}
                onClick={()=>runPlayRadioStation(radio.id, radio.nickname, radio.url, radio.img, radio.country)}/>
              </div>
              <p className={`text-subtitleFontSize leading-subtitleLineHeight text-white line-clamp-1 md:opacity-100 
                ${openNavbar? "opacity-100": "opacity-0 hidden md:line-clamp-1"}`}>{radio.nickname}</p>
            </div>
            <div className={`transition-all duration-500 items-center gap-4 md:flex md:opacity-100 ${openNavbar? "opacity-100 flex": "opacity-0 hidden"} md:hidden md:opacity-0 md:group-hover:flex md:group-hover:opacity-100`}>
              <FaPen className="transition-all duration-500 text-white hover:text-iconsColor cursor-pointer"
                onClick={()=>handleOpenEditModal({id:radio.id, name:radio.nickname})}/>
              <FaTrash className="transition-all duration-500 text-white hover:text-iconsColor cursor-pointer"
                onClick={()=>removeRadioFromFavoriteList(radio.id)}
              />
            </div>
          </li>
        ))} */}
      </div>
    </section>
  )
}