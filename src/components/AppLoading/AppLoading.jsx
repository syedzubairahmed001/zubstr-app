import React from 'react';
import Logo from '../Logo/Logo';
import classes from './AppLoading.module.scss';

const AppLoading = props => {
    return (
        <div className={classes.AppLoading}>
            <div className={classes.AppLoading__LogoContainer}>
                <Logo width="50px" />
            </div>
        </div>
    )
}

export default AppLoading