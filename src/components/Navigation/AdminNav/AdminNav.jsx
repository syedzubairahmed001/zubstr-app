import React from 'react';
import Navigation from '../Navigation';
import {Home, CreditCard, Users, Settings} from 'react-feather';

const InstituteNav = props => {
    const nav = [
        {
            link: '/a/dashboard',
            Icon: Home
        },
        {
            link: '/a/users',
            Icon: Users
        },
        {
            link: '/a/subscription',
            Icon: CreditCard
        },
        {
            link: '/a/settings',
            Icon: Settings
        }
    ]
    return (
        <Navigation data={nav} />
    )
}

export default InstituteNav;