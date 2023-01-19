

export function GaleryLeft({room}){

    const url = room['imgUrls'][0]
    
    return <section className="galeryLeft">
        {
        <img className="leftPic" src={url}/>
        }
    </section>
}