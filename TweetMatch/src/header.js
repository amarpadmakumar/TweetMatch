import React from 'react';
import './App.css';

class Header extends React.Component {
    render() {
        return (
            <div>
                <header className = 'App-header'>
                    {this.props.title}
                </header>
            </div>
        )
    }
}

export default Header;