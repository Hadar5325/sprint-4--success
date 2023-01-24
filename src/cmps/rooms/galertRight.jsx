

export function GaleryRight({ room }) {

    const url = room['imgUrls']
    
    return <section className='galeryRight'>

        <img className="topLeft" src={url[1]} />
        <img className="topRight" src={url[2]} />
        <img className="bottomLeft" src={url[3]} />
        <img className="bottomRight" src={url[4]} />
    </section>

}