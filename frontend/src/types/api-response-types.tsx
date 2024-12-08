interface AllPlaylistTypes {
  ['@assetType']:string 
  ['@key']:string
  ['@lastTouchBy']: string
  ['@lastTx']:string
  ['@lastUpdated']:Date
  name:string
  private:boolean
  artists:any[]
}
export interface AllArtistTypes{
  ['@assetType']:string 
  ['@key']:string
  ['@lastTouchBy']: string
  ['@lastTx']:string
  ['@lastUpdated']:Date
  name:string
  country:string
}