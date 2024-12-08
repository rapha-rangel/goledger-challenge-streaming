import { getAllInfos, getChoisedAlbum, getChoisedArtist, getChoisedPlaylist } from "@/api"
import { useEffect, useState } from "react"
import LoadingDisplay from "./loading-display"
import ArtistInfo from "./artist-info"
import { DisplayInfoTypes } from "@/types/display-info-types";
import { useRouter, useSearchParams } from "next/navigation";
import PlaylistInfo from "./playlist-info"
import AlbumInfo from "./album-info"
import List from "./list"
import { FiPlusCircle } from "react-icons/fi";
import { useOpenModal } from "@/hooks/useOpenModal";


interface DisplayInfoProps {
  updateDisplayInfo:boolean
  searchText: string
  loadingDisplayIsTrue: boolean
  setLoadingDisplayIsTrue:(value: boolean)=> void
}

export default function DisplayInfo ({updateDisplayInfo, searchText, loadingDisplayIsTrue,setLoadingDisplayIsTrue}:DisplayInfoProps){
  const [infoApi, setInfoApis] = useState<any>([]);
  const [displayInfoTypes, setDisplayInfoTypes] =  useState(DisplayInfoTypes.ALL);
  const [choisedArtist, setChoisedArtist] = useState<any>();
  const searchParams  = useSearchParams();
  const router = useRouter();
  const formatParams=searchParams.get('key');
  const {showOrNotModal} = useOpenModal()

  const fetchAllInfos =async ()=>{
    setDisplayInfoTypes(DisplayInfoTypes.ALL);
    const res = await getAllInfos(searchText);
    setInfoApis(res);
    console.log(res)
    setTimeout(()=>{
      setLoadingDisplayIsTrue(false);
    },500)
  }

  useEffect(()=>{
    fetchAllInfos();
  }, [])

  useEffect(()=>{
    console.log(searchText)
    setLoadingDisplayIsTrue(true);
    if(searchText){
      router.push(`/?query=${searchText}`);
      fetchAllInfos();
    } else{
      router.push(`/`)
      fetchAllInfos();
    }
  },[updateDisplayInfo]);

  const choiseArtist =async (key: string)=>{
    router.push(`/?key=${key}`);
    setLoadingDisplayIsTrue(true);
    const res = await getChoisedArtist(key);
    setChoisedArtist(res)
    setDisplayInfoTypes(DisplayInfoTypes.ARTIST)
    setLoadingDisplayIsTrue(false);
  }

  const choisePlaylist =async (key: string)=>{
    router.push(`/?key=${key}`);
    setLoadingDisplayIsTrue(true);
    const res = await getChoisedPlaylist(key);
    setChoisedArtist(res)
    setDisplayInfoTypes(DisplayInfoTypes.PLAYLIST);
    setLoadingDisplayIsTrue(false);
  }

  const choiseAlbum= async (key: string)=>{
    router.push(`/?key=${key}`);
    setLoadingDisplayIsTrue(true);
    const res = await getChoisedAlbum(key);
    setChoisedArtist(res);
    setDisplayInfoTypes(DisplayInfoTypes.ALBUM);
    setLoadingDisplayIsTrue(false);
  }

  const handleOpenModal=(name:string)=>{
    if(name ==="playlists") showOrNotModal(true, DisplayInfoTypes.PLAYLIST)
    if(name ==="albums") showOrNotModal(true, DisplayInfoTypes.ALBUM)
    if(name ==="artists") showOrNotModal(true, DisplayInfoTypes.ARTIST)
  }

  return(
    <section className="relative mt-[5.7rem] w-full">
      <LoadingDisplay loadingDisplayIsTrue={loadingDisplayIsTrue}/>
      {displayInfoTypes === DisplayInfoTypes.ALL &&
      <div id="/" 
        className="relative bg-[#0F0D13] z-10">
          {infoApi && infoApi.map((item:any, index:number)=>(
          <div key={index} className="p-10">
            <div className="flex justify-between mb-2">
              <h3 className="text-white text-[1.6rem] font-semibold ">{item.name}</h3>
              <div className="flex items-center w-[30%] justify-end text-gray-400 text-[1.2rem] gap-8 font-semibold">
                <span className="relative group ">
                  <FiPlusCircle 
                    onClick={()=>handleOpenModal(item.name)}
                    className="group text-[2rem] text-[#656565] hover:text-white cursor-pointer transition-all ease-in-out duration-200"/>
                  <p className="absolute hidden p-2 bg-[#29282D] text-white group-hover:block text-[0.8rem] min-w-[105px] mt-1 left-[50%] -translate-x-[60%] ">Criar {item.name}</p>
                </span>
                  {item.info.length>6?<p className=" cursor-pointer text-gray-400 hover:text-white font-semibold transition-all ease-in-out duration-200">mostar tudo</p>:null}
              </div>
            </div>
            <ul className="flex ">
              {item.info && item.info.slice(0,6).map((inf: any, index:number)=>(
                inf['@assetType'] ==="artist"?
                  <List
                    key={index}
                    type={DisplayInfoTypes.ARTIST}
                    index={index}
                    handleClick={choiseArtist}
                    inf={inf}
                  />:
                inf['@assetType'] ==="playlist"?
                  <List
                    key={index}
                    type={DisplayInfoTypes.PLAYLIST}
                    index={index}
                    handleClick={choisePlaylist}
                    inf={inf}
                  />:
                  <List
                    key={index}
                    type={DisplayInfoTypes.ALBUM}
                    index={index}
                    handleClick={choiseAlbum}
                    inf={inf}
                  />
              ))}     
            </ul>
          </div>
        ))}
      </div>}
      {displayInfoTypes === DisplayInfoTypes.ARTIST && 
        <ArtistInfo
          choisedArtist={choisedArtist}
          setLoadingDisplayIsTrue={setLoadingDisplayIsTrue}
          setDisplayInfoTypes={setDisplayInfoTypes} />
      }
      {displayInfoTypes === DisplayInfoTypes.PLAYLIST && 
        <PlaylistInfo
          choisedArtist={choisedArtist}
          setLoadingDisplayIsTrue={setLoadingDisplayIsTrue}
          setDisplayInfoTypes={setDisplayInfoTypes} />
      }
      {displayInfoTypes === DisplayInfoTypes.ALBUM && 
        <AlbumInfo
          choisedArtist={choisedArtist}
          setLoadingDisplayIsTrue={setLoadingDisplayIsTrue}
          setDisplayInfoTypes={setDisplayInfoTypes} />
      }
    </section>
  )
}