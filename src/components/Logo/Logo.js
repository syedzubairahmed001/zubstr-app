import React from 'react';
import logoLightShadow from '../../assets/logo/zubster_logo__light_shadow.svg'

const logo = props => {
    let width = '1.5rem'
    if(props.width){
        width = props.width;
    }
    return (
        <img src={logoLightShadow} style={{width}}/>
    )
}

export default logo