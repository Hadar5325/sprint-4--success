

export function GaleryLeft({room}){

    const url = room['imgUrls'][0]
    
    return <section>
        {
        <img className="leftGalery" src={url}/>
        }
    </section>
}