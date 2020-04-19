import React from 'react';
import Navigation from '../Navigation';
import {Home, Users, MessageSquare, Settings} from 'react-feather';

const InstituteNav = props => {
    const nav = [
        {
            link: '/c/dashboard',
            tooltip: 'Dashboard',
            Icon: Home
        },
        {
            link: '/c/people',
            tooltip: 'People',
            Icon: Users
        },
        {
            link: '/c/communicate',
            tooltip: 'Communicate',
            Icon: MessageSquare
        },
        {
            link: '/c/settings',
            tooltip: 'Settings',
            Icon: Settings
        }
    ]
    return (
        <Navigation data={nav} />
    )
}

export default InstituteNav;