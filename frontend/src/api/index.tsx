import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { Dispatch } from "react";


const url = "http://ec2-54-91-215-149.compute-1.amazonaws.com/api";
const config: AxiosRequestConfig = {
  headers: {
    'Accept': '*/*',
    'Authorization': 'Basic cHNBZG1pbjpnb2xlZGdlcg==',
    'Content-Type': 'application/json'
  } as RawAxiosRequestHeaders,
};

export const getAllAlbuns =async (searchName:string,limt:number)=>{
  const data = {
    query: {
      selector: {
        "@assetType": "album",
      },
      "limit": limt,
    },
  };
  try{
    const response =await axios.post(`${url}/query/search`,data, config)
    const filterToSearch = response.data.result.filter((item:any)=>item.name.toLowerCase().includes(searchName.toLowerCase()));
    const findArtist = await Promise.all(filterToSearch.map(async (item:any)=>{
      const nameArtist = await getByKey(item.artist['@key']);
      const albumWithName = {...item, artist:{name:nameArtist.name,['@key']: item.artist['@key']}}
      return albumWithName
    }))
    return findArtist;
  } catch(e){
    console.log(e)
  }
}

export const getAllArtists =async (searchName:string,limt:number)=>{
  const data = {
    query: {
      selector: {
        "@assetType": "artist",
      },
      "limit": searchName?0:limt,
    },
  };
  try{
    const response =await axios.post(`${url}/query/search`,data, config)
    const filterToSearch = response.data.result.filter((item:any)=>item.name.toLowerCase().includes(searchName.toLowerCase()));
    return filterToSearch;
  } catch(e){
    console.log(e)
  }
}

export const getAllSongs =async ()=>{
  const data = {
    query: {
      selector: {
        "@assetType": "song",
      },
    },
  };
  try{
    const response =await axios.post(`${url}/query/search`,data, config)
    return response.data.result;
  } catch(e){
    console.log(e)
  }
}

export const getAllPlaylist =async (searchName:string,limt:number)=>{
  const data = {
    query: {
      selector: {
        "@assetType": "playlist",
      },
      "limit": limt,
    },
  };
  try{
    const response =await axios.post(`${url}/query/search`,data, config);
    let filterToSearch;
    if(searchName.length ===0){
      filterToSearch=response.data.result
    } else{
      filterToSearch = response.data.result.filter((item:any)=>item.name.toLowerCase().includes(searchName.toLowerCase()));
    }
    const findArtistBySong = await Promise.all(filterToSearch.map(async(playlist:any)=>{
      playlist.songs= await Promise.all(
        playlist.songs.map(async(playlistSong:any)=>{
          const songObj = await getByKey(playlistSong['@key']);
          const songKey =songObj.album['@key'];
          const albumObj =  await getByKey(songKey);
          const albumKey =albumObj.artist['@key']
          const artistObj = await getByKey(albumKey);
          return {...songObj, artist:artistObj, album: albumObj};
        }))
        
      return playlist
    }))
    console.log(findArtistBySong)
    return findArtistBySong ;
  } catch(e){
    console.log(e)
    return[]
  }
}


export const getByKey =async (key:string)=>{
  const data = {
    query: {
      selector: {
        "@key": key,
      },
    },
  };
  try{
    const response =await axios.post(`${url}/query/search`,data, config)
    return response.data.result[0]
  } catch(e){
    console.log(e)
  }
}

export const getChoisedArtist =async (key:any)=>{
  const artist = await getByKey(key);
  const album = await getAllAlbuns("",0);
  const songs = await getAllSongs();
  const playlists = await getAllPlaylist("",0);
  const filterAlbumByArtist =album?.filter((item:any)=> item.artist['@key']===artist['@key']);
  const songsByArtistAlbum =filterAlbumByArtist?.map((album:any)=>{
    const filter =songs.map((song:any)=>{ 
      if(song.album['@key'] ===album['@key']){
        return {...song, album, artist}
      }
    }).filter((item:any)=> item!==undefined);
    return filter
  }).flat();
  const playlistWithArtist = playlists?.map((playlist:any)=>{
    const findArtistBySong = playlist.songs.filter((song:any)=>(song.artist.name ===artist.name))
    if(findArtistBySong.length>0) return playlist;
  }).filter((item:any)=> item!==undefined);
  const artistAllInfo={ 
    artist,
    albums:filterAlbumByArtist,
    songs:songsByArtistAlbum,
    playlists:playlistWithArtist
  }
  return artistAllInfo;
}

export const getChoisedPlaylist =async (key:any)=>{
  const choisedPlaylist = await getByKey(key);
  const findArtistBySong = await Promise.all(choisedPlaylist?.songs.map(async(playlistSong:any)=>{
    if(!playlistSong['@key'] ) return null;
    const songObj = await getByKey(playlistSong['@key']);
    const albumObj =  await getByKey(songObj.album['@key']);
    const artistObj = await getByKey(albumObj.artist['@key'])
    return {...songObj, artist:artistObj, album: albumObj};
  }))
  return {...choisedPlaylist, songs:findArtistBySong} ;

}

export const getChoisedAlbum =async (key:any)=>{
  const album = await getByKey(key);
  const artist = await getByKey(album.artist['@key']);
  const allAlbums = await getAllAlbuns("",0);
  const otherAllbunsByArtist= allAlbums?.filter((album:any)=> album.artist['@key']=== artist['@key'] && album['@key']!== key)
  const allSongs = await getAllSongs();
  const songsByAlbum =allSongs.map((song:any)=>{
    if(song.album['@key']===key) return {...song, artist, album}
    }).filter((item:any)=>item!==undefined);
  const albumAllInfo ={album, songs:songsByAlbum, otherAlbums:otherAllbunsByArtist}
  return albumAllInfo;
}

export const getAlbumByArtist= async (key:string)=>{
  const allAlbums = await getAllAlbuns("",0);
  const otherAllbunsByArtist= allAlbums?.filter((album:any)=> album.artist['@key'] === key);
  return otherAllbunsByArtist;
}

export const createArtist =async (name: string,country:string, 
    showAlert:(value:{title:string, content:string, colorAlert:string, isOpen:boolean})=> void, 
    handleBack:()=>void,
    setLoadingButton:(value: boolean)=> void,
    setUpdateDisplayInfo:Dispatch<React.SetStateAction<boolean>>
  )=>{
  const data = {
    asset: [
    {
      "@assetType": "artist",
      name,
      country,
    }
    ]
  }
  try{
    const response =await axios.post(`${url}/invoke/createAsset`,data, config);
    if(response.status ===200){
      setLoadingButton(false);
      showAlert({
        title:"Funcionou",
        content:"Artista Criado com sucesso",
        colorAlert:"erro", isOpen:true
      });
      setUpdateDisplayInfo(prev=> !prev);
      handleBack();
    } 
  }catch(error){
    if(axios.isAxiosError(error)){
      console.log(error)
      if(error.response?.status===409){
        setLoadingButton(false);
        showAlert({
          title:"Houve um problema",
          content:"Artista já criado",
          colorAlert:"erro", isOpen:true
        });
      }
    }
  }
}

export const updateArtist =async (name: string,country:string, 
  showAlert:(value:{title:string, content:string, colorAlert:string, isOpen:boolean})=> void, 
  handleBack:()=>void,
  setLoadingButton:(value: boolean)=> void,
  setUpdateDisplayInfo:Dispatch<React.SetStateAction<boolean>>
)=>{
const data = {
  "update":{
    "@assetType": "artist",
    name,
    country,
  }
}
try{
  const response =await axios.post(`${url}/invoke/updateAsset`,data, config);
  if(response.status ===200){
    setLoadingButton(false);
    showAlert({
      title:"Funcionou",
      content:"Artista atualizado com sucesso",
      colorAlert:"erro", isOpen:true
    });
    setUpdateDisplayInfo(prev=> !prev);
    handleBack();
  } 
}catch(error){
  if(axios.isAxiosError(error)){
    console.log(error)
    if(error.response?.status===404){
      setLoadingButton(false);
      showAlert({
        title:"Houve um problema",
        content:"Artista não criado",
        colorAlert:"erro", isOpen:true
      });
    }
  }
}
}

export const createPlaylist =async (name: string,isPrivate:boolean, 
  showAlert:(value:{title:string, content:string, colorAlert:string, isOpen:boolean})=> void, 
  handleBack:()=>void,
  setLoadingButton:(value: boolean)=> void,
  setUpdateDisplayInfo:Dispatch<React.SetStateAction<boolean>>
)=>{
const data = {
  asset: [
  {
    "@assetType": "playlist",
    name,
    private:isPrivate,
    songs:[]
  }
  ]
}
try{
  const response =await axios.post(`${url}/invoke/createAsset`,data, config);
  console.log(response)
  if(response.status ===200){
    setLoadingButton(false);
    showAlert({
      title:"Funcionou",
      content:"Playlist Criada com sucesso",
      colorAlert:"erro", isOpen:true
    });
    setUpdateDisplayInfo(prev=> !prev);
    handleBack();
  } 
}catch(error){
  if(axios.isAxiosError(error)){
    console.log(error)
    if(error.response?.status===409){
      setLoadingButton(false);
      showAlert({
        title:"Houve um problema",
        content:"Playlist já criado",
        colorAlert:"erro", isOpen:true
      });
    }
  }
}
}

export const createAlbum =async (name: string, year:string, nameArtist:string, 
  showAlert:(value:{title:string, content:string, colorAlert:string, isOpen:boolean})=> void, 
  handleBack:()=>void,
  setLoadingButton:(value: boolean)=> void,
  setUpdateDisplayInfo:Dispatch<React.SetStateAction<boolean>>
)=>{
const data = {
  asset: [
  {
    "@assetType": "album",
    name,
    year, 
    artist:{
      name:nameArtist
    },
  }
  ]
}
try{
  const response =await axios.post(`${url}/invoke/createAsset`,data, config);
  console.log(response)
  if(response.status ===200){
    setLoadingButton(false);
    showAlert({
      title:"Funcionou",
      content:"Album Criado com sucesso",
      colorAlert:"erro", isOpen:true
    });
    setUpdateDisplayInfo(prev=> !prev);
    handleBack();
  } 
}catch(error){
  if(axios.isAxiosError(error)){
    console.log(error)
    if(error.response?.status===409){
      setLoadingButton(false);
      showAlert({
        title:"Houve um problema",
        content:"Album já criado",
        colorAlert:"erro", isOpen:true
      });
    }
  }
}
}

export const createSong =async (name: string, nameArtist:string, nameAlbum:string, 
  showAlert:(value:{title:string, content:string, colorAlert:string, isOpen:boolean})=> void, 
  handleBack:()=>void,
  setLoadingButton:(value: boolean)=> void,
  setUpdateDisplayInfo:Dispatch<React.SetStateAction<boolean>>
)=>{
const data = {
  asset: [
    {
      "@assetType": "song",
      name,
      album:{
        name:nameAlbum,
        artist:{
          name:nameArtist
        }
      }
    }
  ]
}
try{
  const response =await axios.post(`${url}/invoke/createAsset`,data, config);
  console.log(response)
  if(response.status ===200){
    setLoadingButton(false);
    showAlert({
      title:"Funcionou",
      content:"Música Criada com sucesso",
      colorAlert:"erro", isOpen:true
    });
    setUpdateDisplayInfo(prev=> !prev);
    handleBack();
  } 
}catch(error){
  if(axios.isAxiosError(error)){
    console.log(error)
    if(error.response?.status===409){
      setLoadingButton(false);
      showAlert({
        title:"Houve um problema",
        content:"Música já criado",
        colorAlert:"erro", isOpen:true
      });
    }
  }
}
}

export const updateSong =async (name: string, nameArtist:string, nameAlbum:string, 
  showAlert:(value:{title:string, content:string, colorAlert:string, isOpen:boolean})=> void, 
  handleBack:()=>void,
  setLoadingButton:(value: boolean)=> void,
  setUpdateDisplayInfo:Dispatch<React.SetStateAction<boolean>>
)=>{
const data = {
  "update": {
      "@assetType": "song",
      name,
      album:{
        name:nameAlbum,
        artist:{
          name:nameArtist
        }
      }
    }
}

try{
  const response =await axios.post(`${url}/invoke/updateAsset`,data, config);
  console.log(response)
  if(response.status ===200){
    setLoadingButton(false);
    showAlert({
      title:"Funcionou",
      content:"Música Atualizada com sucesso",
      colorAlert:"erro", isOpen:true
    });
    setUpdateDisplayInfo(prev=> !prev);
    handleBack();
  } 
}catch(error){
  if(axios.isAxiosError(error)){
    console.log(error)
    if(error.response?.status===409){
      setLoadingButton(false);
      showAlert({
        title:"Houve um problema",
        content:"Música já criado",
        colorAlert:"erro", isOpen:true
      });
    }
  }
}
}

export const getAllInfos=async(searchName:string)=>{
  const artist = await getAllArtists(searchName,6);
  const album =await getAllAlbuns(searchName, 6);
  const playlist = await getAllPlaylist(searchName, 6);
  console.log(playlist)
  const allInfos =  [{name:"artists", info:artist},
                    {name:"playlists", info:playlist}, 
                    {name:"albums", info:album}];
  return allInfos
}