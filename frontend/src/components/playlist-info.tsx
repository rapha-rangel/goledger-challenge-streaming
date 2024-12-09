import background from '../assets/background_artist.jpg'
import playlistImage from '../assets/playlist_img.jpg'
import { FaRegHeart, FaTrash } from "react-icons/fa";
import login from '../assets/login.png'
import { DisplayInfoTypes } from '@/types/display-info-types';
import ListMusic from './list-music';


interface PlaylistInfoProps{
  setDisplayInfoTypes:(value:DisplayInfoTypes)=>void
  setLoadingDisplayIsTrue:(value: boolean)=> void
  choisedArtist: any
}

export default function PlaylistInfo ({choisedArtist } :PlaylistInfoProps){
  return(
    <section 
      className='relative z-10'>
      <header 
        style ={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(12,12,12,1) 80%), url(${background.src})`}}
        className="h-[300px] flex items-end bg-center px-12">
        <div className='group flex justify-between w-full items-center'> 
          <div>
            <h1 className="text-[4rem] font-bold text-white">{choisedArtist.name}</h1>
            <div className="flex max-w-[600px]">
              <span className="text-gray-400 text-[0.9rem] line-clamp-1">Aqui tem
                  {choisedArtist.songs.slice(0,3).map((song: any, index:number)=>(
                    <span key={index}> {song.artist.name}{index+1 !==choisedArtist.songs.slice(0,3).length?",":null} </span>
                  ))}
              </span>
            </div>
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
            {choisedArtist.songs.map((song:any, index:number)=>(
              <ListMusic
                key={index}
                index={index}
                song={song}/>
            ))}
          </>
          :
          <h3 className='flex justify-center mt-8 text-gray-400 text-[1.2rem] fonte-semibold'>Não existe músicas</h3>}
        </ul>
        
      </div>
      
    </section>
  )
}