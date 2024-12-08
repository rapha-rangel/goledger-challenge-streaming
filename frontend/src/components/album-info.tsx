import background from '../assets/background_artist.jpg'
import { FaRegHeart, FaTrash } from "react-icons/fa";
import { DisplayInfoTypes } from '@/types/display-info-types';
import List from './list';
import ListMusic from './list-music';
import { useState } from 'react';


interface AlbumInfoProps{
  setDisplayInfoTypes:(value:DisplayInfoTypes)=>void
  setLoadingDisplayIsTrue:(value: boolean)=> void
  choisedArtist: any
}

export default function AlbumInfo ({choisedArtist } :AlbumInfoProps){
  const [searchMoreMusics, setSearchMoreMusics] = useState(10);
  return(
    <section 
      className='relative z-10'>
      <header 
        style ={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(12,12,12,1) 80%), url(${background.src})`}}
        className="h-[300px] flex items-end bg-center px-12">
        <div className='group flex justify-between w-full items-center'> 
          <div>
          <h1 className="text-[4rem] font-bold text-white">{choisedArtist.album.name}</h1>
          <p className="text-[1rem] font-bold text-white">{choisedArtist.album.year}</p>
          </div>
          <div className='flex flex-col gap-8 opacity-0  text-white group-hover:opacity-100 text-[2rem] transition-all ease-in-out duration-300'>
            <span><FaTrash/></span>
            <span><FaTrash/></span>
          </div>
        </div>
      </header>
      <div className='flex p-12 gap-8'>
        <ul className='w-full'>
          <h4 className='text-white text-[1rem] font-semibold mb-4'>Musicas</h4>
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
      </div>
      <div className="p-10">
        <div className="flex justify-between mb-2">
          <h3 className="text-white text-[1.6rem] font-semibold">Albuns</h3>
          <div className="flex justify-end text-gray-400 text-[1.2rem] gap-8 font-semibold">
            <span className='cursor-pointer hover:text-white transition-all ease-in-out duration-200'>+</span> 
            {choisedArtist.otherAlbums.length > 5?<span>mostar tudo</span>:null}
          </div>
        </div>
        <ul className='flex gap-8'>
          {choisedArtist.otherAlbums.length> 0 ?
            choisedArtist.otherAlbums.map((inf:any, index:number)=>(
              <List
                key={index}
                type={DisplayInfoTypes.ALBUM}
                index={index}
                handleClick={()=>{}}
                inf={inf}/>
          )):<h3 className='flex justify-center mt-8 text-gray-400 text-[1.2rem] fonte-semibold'>Não existe albuns</h3>}
        </ul>
      </div>
      
    </section>
  )
}