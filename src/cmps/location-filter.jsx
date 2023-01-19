// import {} from '../assets/img/'
// import {} from '../assets/img/'
// import {} from '../assets/img/'
// import {} from '../assets/img/'
// import {} from '../assets/img/'
// import {} from '../assets/img/'

export function LocationFilter(){

function onSetFilter(region){
    console.log('region:',region)
}

  return (
    <section className="location-filter">
<div className="img-container"><img onClick={()=>onSetFilter('flexible')} src="" alt="" /></div>
<p>I’m flexible</p>
<div className="img-container"><img onClick={()=>onSetFilter('middle east')} src="" alt="" /></div>
<p>Middle East</p>
<div className="img-container"><img onClick={()=>onSetFilter('italy')} src="" alt="" /></div>
<p>Italy</p>
<div className="img-container"><img onClick={()=>onSetFilter('united states')} src="" alt="" /></div>
<p>United States</p>
<div className="img-container"><img onClick={()=>onSetFilter('france')} src="" alt="" /></div>
<p>France</p>
<div className="img-container"><img onClick={()=>onSetFilter('south america')} src="" alt="" /></div>
<p>South America</p>
</section>    
  )
}