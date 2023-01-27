

export function GaleryLeft({stay}){

    const url = stay['imgUrls'][0]
    
    return <img className='galeryLeft' src={url}/>
       
}