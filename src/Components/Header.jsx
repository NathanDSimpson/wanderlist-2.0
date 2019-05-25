import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component{
    state = {
        dropdownClassName: ''
    }


    // toggle the classNames of the dropdown list items to use display: none in styling    
    toggle_dropdown = () => {
        this.state.dropdownClassName === 'hide' ? this.setState({dropdownClassName: ''}) : this.setState({dropdownClassName: 'hide'})
    }

    render(){
        return(
            <header className='page-header'>
                <div>WanderList</div>
                <nav>
                    <div className='user-navbar'>
                        <i onClick={this.toggle_dropdown} className="fas fa-user"></i>
                        <ul>
                            <li className={this.state.dropdownClassName} onClick={() => {this.props.history.push('/items')}}>Items</li>
                            <li className={this.state.dropdownClassName} onClick={() => {this.props.history.push('/lists')}}>Lists</li>
                            <li className={this.state.dropdownClassName} onClick={() => {this.props.history.push('/trips')}}>Trips</li>
                            <li className={this.state.dropdownClassName} onClick={() => {this.props.history.push('/login')}}>Log In</li>
                            <li className={this.state.dropdownClassName} onClick={() => {this.props.history.push('/register')}}>Register</li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default withRouter(Header)