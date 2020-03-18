import React from 'react';
import Navigation from '../Navigation';
import {Home, Users, MessageSquare, Settings} from 'react-feather';

const InstituteNav = props => {
    const nav = [
        {
            link: '/i/dashboard',
            tooltip: 'Dashboard',
            Icon: Home
        },
        {
            link: '/i/users',
            tooltip: 'Users',
            Icon: Users
        },
        {
            link: '/i/messages',
            tooltip: 'Messages',
            Icon: MessageSquare
        },
        {
            link: '/i/settings',
            tooltip: 'Settings',
            Icon: Settings
        }
    ]
    return (
        <Navigation data={nav} />
    )
}

export default InstituteNav;