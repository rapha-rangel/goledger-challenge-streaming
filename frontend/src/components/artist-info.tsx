import background from '../assets/background_artist.jpg'
import playlistImage from '../assets/playlist_img.jpg'
import { FaRegHeart, FaTrash } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { DisplayInfoTypes } from '@/types/display-info-types';
import ListMusic from './list-music';
import List from './list';
import { useState } from 'react';
import { useOpenModal } from '@/hooks/useOpenModal';
import { useInfoDisplay } from '@/hooks/useInfoDisplay';
import { ActionModalTypes } from '@/types/action-modal-types';
import { FiPlusCircle } from "react-icons/fi";

interface ArtistInfoProps{
  setDisplayInfoTypes:(value:DisplayInfoTypes)=>void
  setLoadingDisplayIsTrue:(value: boolean)=> void
  choisedArtist: any
}

export default function ArtistInfo ({choisedArtist}:ArtistInfoProps){
  const [searchMoreMusics, setSearchMoreMusics] = useState(5);
  const {showOrNotModal} = useOpenModal();
  const {setInputValue1, setInputValue2, setSelectedArtist, setAlbumsByArtist} = useInfoDisplay();

  const handleOpenModalUpdateArtist=(name: string, country: string)=>{
    showOrNotModal(true,DisplayInfoTypes.ARTIST, ActionModalTypes.UPDATE )
    setInputValue1(name)
    setInputValue2(country)
  }

  const handleOpenModalCreateMusic =(name:string, key:string)=>{
    showOrNotModal(true,DisplayInfoTypes.SONG, ActionModalTypes.UPDATE);
    setSelectedArtist([key, name])
  }


  const handleOpenModalDeleteArtist =( name:string, key:string)=>{
    showOrNotModal(true,DisplayInfoTypes.ARTIST, ActionModalTypes.DELETE);
    setSelectedArtist([key, name])
  }



  return(
    <section 
      className='relative z-10'>
      <header 
        style ={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(12,12,12,1) 80%), url(${background.src})`}}
        className="h-[300px] flex items-end bg-center px-12">
        <div className='group flex justify-between w-full items-center'> 
          <div>
          <h1 className="text-[4rem] font-bold text-white">{choisedArtist.artist.name}</h1>
          <p className="text-[1rem] font-bold text-white">{choisedArtist.artist.country}</p>
          </div>
          <div className='flex flex-col gap-8 opacity-0  text-white group-hover:opacity-100 text-[2rem] transition-all ease-in-out duration-300'>
            <span className="relative peer ">
              <FaUserGroup 
                onClick={()=>handleOpenModalUpdateArtist(choisedArtist.artist.name,choisedArtist.artist.country )}
                className="peer text-[2rem] text-[#656565] hover:text-white cursor-pointer transition-all ease-in-out duration-200"/>
              <p className="absolute hidden p-2 bg-[#29282D] text-white peer-hover:block text-[0.8rem] min-w-[105px] mt-1 left-[50%] -translate-x-[60%] ">Atualizar Artista</p>
            </span>
            <span className='relative peer'>
              <FaTrash
              onClick={()=>handleOpenModalDeleteArtist(choisedArtist.artist.name,choisedArtist.artist.country )}
              className="peer text-[2rem] text-[#656565] hover:text-white cursor-pointer transition-all ease-in-out duration-200"/>
              <p className="absolute hidden p-2 bg-[#29282D] text-white peer-hover:block text-[0.8rem] min-w-[105px] mt-1 left-[50%] -translate-x-[60%] ">Deletar Artista</p>
            </span>
          </div>
        </div>
      </header>
      <div className='flex p-12 gap-8'>
        <ul className='w-[70%]'>
          <div className='group relative flex justify-between'>
          <h4 className=' text-white text-[1rem] font-semibold mb-4'>Musicas novas</h4>
          <div className='flex gap-8 opacity-0  text-white group-hover:opacity-100 text-[2rem] transition-all ease-in-out duration-300'>
            <span className="relative peer  ">
              <FiPlusCircle 
                onClick={()=>handleOpenModalCreateMusic(choisedArtist.artist.name,choisedArtist.artist['@key'] )}
                className="peer text-[2rem] text-[#656565] hover:text-white cursor-pointer transition-all ease-in-out duration-200"/>
              <p className="absolute hidden p-2 bg-[#29282D] text-white peer-hover:block text-[0.8rem] min-w-[105px] mt-1 left-[50%] -translate-x-[60%] ">Criar Música</p>
            </span>
          </div>
          </div>
          
          <hr className='bg-[#555257] border-0 h-px'/>
          {choisedArtist.songs.length>0 ?
          <>
            {choisedArtist.songs.slice(0,searchMoreMusics).map((song:any, index:number)=>(
              <ListMusic
                key={index}
                index={index}
                song={song}
            />
            ))}
            {choisedArtist.songs.length>choisedArtist.songs.slice(0,searchMoreMusics).length ?
              <button
                onClick={()=>setSearchMoreMusics(10)}
                className='mt-4 bg-transparent text-gray-400 hover:text-white font-semibold transition-all ease-in-out duration-200'>Ver mais</button>
            :null}    
          </>
          :
          <h3 className='flex justify-center mt-8 text-gray-400 text-[1.2rem] fonte-semibold'>Não existe músicas</h3>}
        </ul>
        <ul className=' w-[25%] flex flex-col gap-4'>
          <h4 className='text-white text-white text-[1rem] font-semibold hover:underline transition-all ease-in-out duration-200 '>Playlist</h4>
          {choisedArtist && choisedArtist.playlists.slice(0,3).map((playlist:any, index:number)=>(
            <li
              key={index}
              className='group flex justify-between w-full cursor-pointer'>
            <div className='flex gap-2'>
              <img src={playlistImage.src} className='w-[36px] h-[36px] rounded-md' alt="imagem da playlist"/>
              <span className='text-white text-[1rem]'>{playlist.name}</span>
            </div>
            <div className='flex flex-col gap-4 opacity-0 text-white group-hover:opacity-100 transition-all ease-in-out duration-300'>
              <span className='hover:scale-110 transition-all ease-in-out duration-300'><FaRegHeart/></span>
              <span className='hover:scale-110 transition-all ease-in-out duration-300'><FaTrash/></span>
            </div>
          </li>
          ))}
        </ul>
      </div>
      <div className="px-12 pb-8">
        <div className="flex justify-between mb-2">
          <h3 className="text-white text-[1.6rem] font-semibold ">Albuns</h3>
          {choisedArtist.length>5?
            <div className="flex justify-end text-gray-400 text-[1.2rem] gap-8 font-semibold">
            <span>+</span> 
            <span>mostar tudo</span>
          </div>
          : null}
        </div>
        <ul className="flex gap-8 ">
          {choisedArtist.albums.length>0? choisedArtist.albums.map((album:any, index:number)=>(
            <List
              key={index}
              type={DisplayInfoTypes.ALBUM}
              index={index}
              handleClick={()=>{}}
              inf={album}
            />
          ))
        : <h3 className='flex justify-center mt-8 text-gray-400 text-[1.2rem] fonte-semibold'>Não existe albuns</h3>}
        </ul>
      </div>
    </section>
  )
}