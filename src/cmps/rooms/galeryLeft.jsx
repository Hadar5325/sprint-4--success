

export function GaleryLeft({room}){

    const url = room['imgUrls'][0]
    
    return <img className='galeryLeft' src={url}/>
       
}