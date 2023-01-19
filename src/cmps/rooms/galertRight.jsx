

export function GaleryRight({room}){

    const url = room['imgUrls'][0]
    if(room){
        return <section className="galeryRight">
        
        <img className="top-left" src={url}/>
        <img className="top-right" src={url}/>
        <img className="bottom-left" src={url}/>
        <img className="bottom-right" src={url}/>

        
    </section>
    }else{
        return <section> loading</section>
    }

    
}