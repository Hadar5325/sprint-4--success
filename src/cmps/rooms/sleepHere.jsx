import dubelBed from '../../assets/img/dubelBed.svg'


export function SleepHere({ room, avgRate }) {

    return <section className='sleepHere'>
        <div className='sleepHereTilte'>Where you'll sleep</div>

        <div className="sleepHereContant">

        <div className="sleepHereBigBox">
                <div className='sleepHereBox'>
                <img className='bedPic' src={dubelBed}/>
                    <div className='roomNum'>Bedroom 1</div>
                    <div className='bedKind'>1 queen bed</div>
                </div>
            </div>

            <div className="sleepHereBigBox">
                <div className='sleepHereBox'>
                <img className='bedPic' src={dubelBed}/>
                    <div className='roomNum'>Bedroom 1</div>
                    <div className='bedKind'>1 queen bed</div>
                </div>
            </div>

            <div className="sleepHereBigBox">
                <div className='sleepHereBox'>
                <img className='bedPic' src={dubelBed}/>
                    <div className='roomNum'>Bedroom 1</div>
                    <div className='bedKind'>1 queen bed</div>
                </div>
            </div>


        </div>
        
    </section>

}