import { useOpenModal } from "@/hooks/useOpenModal";
import { useEffect } from "react";
import { TbMusicCheck } from "react-icons/tb";


export default function Snackbar(){

  const {openAlert, hiddenAlert} = useOpenModal();

  useEffect(() => {

    const timeout =setTimeout(() => {
      hiddenAlert();
    }, 4000);


    return () => clearTimeout(timeout);
  }, [hiddenAlert]);
  
  return(
    <div className={`${openAlert.isOpen?"right-10 z-40":"-right-[450px] z-40"} 
      text-gray-100 bg-[#1B191F] fixed top-10  w-[400px]  rounded-md  px-4 py-3 shadow-md" role="alert" transition-all duration-500 ease-in-out`}>
      <div className="flex gap-4">
        <TbMusicCheck className="text-[4rem] rounded-full border-4 px-2 border-[#636069] text-[#636069]" />
        <div className="flex flex-col justify-center">
          <p className="font-bold text-[1.2rem] text-[#636069]">{openAlert.title}</p>
          <p className="text-sm text-[1rem] text-[#636069]">{openAlert.content}</p>
        </div>
      </div>
    </div>
  )
}