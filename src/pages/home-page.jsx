import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StayList } from '../cmps/stay-list'

import { loadStays, addStay, updateStay, removeStay } from '../store/actions/stay.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay.service.local'
export function HomePage() {
   
    // const count = useSelector(storeState => storeState.userModule.count)

    const stays = useSelector((state) => state.stayModule.stays)
    const filterBy= useSelector((state) => state.stayModule.filterBty)


    useEffect(() => {
        loadStays(filterBy)
            
    }, [filterBy])


    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')            
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    async function onAddStay() {
        const stay = stayService.getEmptyStay()
        stay.vendor = prompt('Vendor?')
        try {
            const savedStay = await addStay(stay)
            showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            showErrorMsg('Cannot add stay')
        }        
    }

    async function onUpdateStay(stay) {
        const price = +prompt('New price?')
        const stayToSave = { ...stay, price }
        try {
            const savedStay = await updateStay(stayToSave)
            showSuccessMsg(`Stay updated, new price: ${savedStay.price}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }        
    }


console.log('stays at homepage:',stays)
    if (!stays) return <div>Loading...</div>
    return (
        <div className='stay-app main-layout'>
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
