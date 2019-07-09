import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import facial from './facial.png'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                {/* <div className="Tilt-inner"> 👽 </div> */}
                <div className="Tilt-inner p3"> <img style={{ paddingTop: '5px' }} src={facial} alt='' /></div>
            </Tilt>
        </div>
    )
}

export default Logo;