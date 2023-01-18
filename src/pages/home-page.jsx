import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StayList } from '../cmps/stay-list'
import { loadStays } from '../store/actions/stay.action'
// import logo from '../assets/img/logo.png'
// import { CHANGE_COUNT } from '../store/user.reducer'

export function HomePage() {
   
    // const count = useSelector(storeState => storeState.userModule.count)

    const stays = useSelector((state) => state.stayModule.stays)
    const filterBy= useSelector((state) => state.stayModule.filterBty)


    useEffect(() => {
        loadStays(filterBy)
            .then(() => {
                console.log('Loaded successfully')
            })
            .catch((err) => {
                console.log('Something went wrong', err)
            })
    }, [filterBy])


    // function changeCount(diff) {
    //     console.log('Changing count by:', diff);
    //     dispatch({ type: CHANGE_COUNT, diff })
    // }

    function onRemoveStay(){
        console.log('removing stays...')
    }


console.log('stays at homepage:',stays)
    if (!stays) return <div>Loading...</div>
    return (
        <div className='stay-app main-container'>
            <StayList stays={stays} onRemoveStay={onRemoveStay} />
            <section className='main-control-container'>
                {/* <Button className='add-link'>
                <NavLink to='/toy/edit'>Add Toy</NavLink>
              </Button> */}

              
            </section>

            {/* <StayList toys={toys} onRemove={onRemoveToy} /> */}
        </div>
    )
}





<section>
    {/* <img src={logo} alt="Logo" style={{ maxWidth: '300px' }} /> */}
    <h2>
        {/* Count {count}
                <button onClick={() => {
                    changeCount(1)
                }}>+</button>
                <button onClick={() => {
                    changeCount(10)
                }}>+10</button> */}
    </h2 >
</section >
