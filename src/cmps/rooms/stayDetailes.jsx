

export function StayDetailes({room}){
    
    return <section className="stayDetailes">
        <div className='detailesTitle'>
            <div>{room.name}  hosted by  {room['host']['fullname']}</div>
            <div>{room.capacity} guests.</div>
            <hr className="detailesHr"></hr>
        </div>
       
        <div className='fff'>
            ask risan
        </div>
       
        <div className='airCover'>

        Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
        </div>
    </section>
}