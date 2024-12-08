import { FaRegHeart, FaTrash } from "react-icons/fa"


interface ListMusic{
  index: number
  song: any
}

export default function ListMusic ({index, song }:ListMusic){
  console.log(song)
  return(
    <li
      key={index}
      className='w-full cursor-pointer rounded-md flex justify-between text-white hover:bg-gray-600 p-4 transition-all ease-in-out duration-200'>
      <div className='flex gap-4 w-2/6'>
        <span>{index+1}</span>
        <span>{song.name}</span>
      </div>
      <span className='flex w-2/6 justify-center'>{song.album.name}</span>
      <span className='flex w-2/6 justify-center'>{song.artist.name}</span>
      <div className='flex  gap-4  text-white'>
        <span className='hover:scale-110 transition-all ease-in-out duration-300'><FaRegHeart/></span>
        <span className='hover:scale-110 transition-all ease-in-out duration-300'><FaTrash/></span>
      </div>
    </li>
  )
}