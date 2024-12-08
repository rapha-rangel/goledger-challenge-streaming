'use client'

import background from '../../assets/background_artist.jpg'
import playlistImage from '../../assets/playlist_img.jpg'
import { FaRegHeart, FaTrash } from "react-icons/fa";
import login from '../../assets/login.png'
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { DisplayInfoTypes } from '../../types/display-info-types';
import { getChoisedArtist } from '../../api';
interface ArtistInfoProps{
  choisedArtist: any
}

interface ArtistInfoProps{
  setDisplayInfoTypes:(value:DisplayInfoTypes)=>void
  setLoadingDisplayIsTrue:(value: boolean)=> void
}

export default function ArtistInfo ({setLoadingDisplayIsTrue,setDisplayInfoTypes }:ArtistInfoProps){
  const [choisedArtist, setChoisedArtist] = useState<any>();

  const searchParams = useSearchParams();
  const getArtist =async()=>{
    const res = await getChoisedArtist(searchParams);
    console.log(res)
    await setChoisedArtist(res);
    await setDisplayInfoTypes(DisplayInfoTypes.ARTIST);
    await setLoadingDisplayIsTrue(false);
  }
  useEffect(()=>{
    getArtist()
  },[])

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
            <span><FaTrash/></span>
            <span><FaTrash/></span>
          </div>
        </div>
      </header>
      <div className='flex p-12 gap-8'>
        <ul className='w-[70%]'>
          <h4 className='text-white text-[1rem] font-semibold mb-4'>Musicas novas</h4>
          <hr className='bg-[#555257] border-0 h-px'/>
          {choisedArtist && choisedArtist.songs.map((song:any, index:number)=>(
            <li
              key={index}
              className='w-full cursor-pointer rounded-md flex justify-between text-white hover:bg-gray-600 p-4 transition-all ease-in-out duration-200'>
            <div className='flex gap-4 w-1/6'>
              <span>{index+1}</span>
              <span>{song.name}</span>
            </div>
            <span className='flex w-4/6 justify-center'>{song.album.name}</span>
            <div className='flex  gap-4  text-white'>
              <span className='hover:scale-110 transition-all ease-in-out duration-300'><FaRegHeart/></span>
              <span className='hover:scale-110 transition-all ease-in-out duration-300'><FaTrash/></span>
            </div>
          </li>
          ))}
          <button className='mt-4 bg-transparent text-gray-400 hover:text-white font-semibold transition-all ease-in-out duration-200'>Ver mais</button>
        </ul>
        <ul className=' w-[25%] flex flex-col gap-4'>
          <h4 className='text-white text-white text-[1rem] font-semibold hover:underline transition-all ease-in-out duration-200 '>Playlist <span>+</span></h4>
          {choisedArtist && choisedArtist.playlists.map((playlist:any, index:number)=>(
            <li
              key={index}
              className='group flex justify-between w-full'>
            <div className='flex gap-2'>
              <img src={playlistImage.src} className='w-[46px] h-[46px] rounded-md' alt="imagem da playlist"/>
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
          <h3 className="text-white text-[1.6rem] font-semibold ">Albums</h3>
          <div className="flex justify-end text-gray-400 text-[1.2rem] gap-8 font-semibold">
            <span>+</span> 
            <span>mostar tudo</span>
          </div>
        </div>
        <ul className="flex gap-8 overflow-hidden">
          {choisedArtist && choisedArtist.albums.map((album:any, index:number)=>(
            <li
              key={index}
              className="flex flex-col p-4  gap-[25px] min-w-[240px] max-w-[240px] rounded-md  transition-all ease-in-out duration-200 hover:bg-[rgba(0,0,0,0.8)]">
            <img className="rounded-md w-full" src={login.src} alt="image"/>
            <div className="flex flex-col">
              <span className="text-white text-[1.2rem]">{album.name}</span>
              <span className="text-gray-400 text-[0.9rem]">{album.year}</span>
            </div>
          </li>
          ))}
        </ul>
      </div>
    </section>
  )
}