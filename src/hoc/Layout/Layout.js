import React, {Component} from 'react';

import Navigation from '../../components/Navigation/Navigation';
class Layout extends Component {
    state = {
        
    }

    render() {
        return (
            <>
                <Navigation />
                <main>
                    {this.props.children}
                </main>
            </>
        )
    }
}

export default Layout