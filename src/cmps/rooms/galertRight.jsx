

export function GaleryRight({ room }) {

    const url = room['imgUrls'][0]

    return <section className='galeryRight'>

        <img className="topLeft" src={url} />
        <img className="topRight" src={url} />
        <img className="bottomLeft" src={url} />
        <img className="bottomRight" src={url} />
    </section>

}