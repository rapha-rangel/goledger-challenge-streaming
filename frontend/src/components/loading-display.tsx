import { VscLoading } from "react-icons/vsc";
interface LoadingDisplayProps{
  loadingDisplayIsTrue: boolean
}

export default function LoadingDisplay({loadingDisplayIsTrue}:LoadingDisplayProps){
  return(
    <section className={`${loadingDisplayIsTrue?"opacity-100 z-20 absolute":"opacity-0 z-0 hidden"} flex w-full h-full justify-center bg-[#0F0D13] top-0 left-0`}>
      <VscLoading className="animate-spin text-[2rem] text-white mt-[20%]"/>
    </section>
  )
}