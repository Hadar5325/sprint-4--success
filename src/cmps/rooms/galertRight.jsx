

export function GaleryRight({ room }) {

    const url = room['imgUrls'][0]

    return <section className="rightGalery">

        <img className="top-left" src={url} />
        <img className="top-right" src={url} />
        <img className="bottom-left" src={url} />
        <img className="bottom-right" src={url} />


    </section>



}