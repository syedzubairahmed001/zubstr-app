import React from 'react';
import Navigation from '../Navigation';
import {Home, CreditCard, Grid, Settings} from 'react-feather';

const InstituteNav = props => {
    const nav = [
        {
            link: '/a/dashboard',
            tooltip: 'Dashboard',
            Icon: Home
        },
        {
            link: '/a/institutes',
            tooltip: 'Institutes',
            Icon: Grid
        },
        {
            link: '/a/subscription',
            tooltip: 'Subscription',
            Icon: CreditCard
        },
        {
            link: '/a/settings',
            tooltip: 'Settings',
            Icon: Settings
        }
    ]
    return (
        <Navigation data={nav} />
    )
}

export default InstituteNav;