import React from 'react';
import {useDispatch} from 'react-redux'
import {setPageTitle} from '../../../store/actions/global'

const Dashboard = props => {
    const dispatch = useDispatch();
    dispatch(setPageTitle('Dashboard'))
    return <div></div>
}

export default Dashboard;