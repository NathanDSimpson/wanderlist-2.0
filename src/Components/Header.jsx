import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { logoutUser } from '../redux/reducer'
import axios from 'axios'

class Header extends Component{
    state = {
        dropdownClassName: ''
    }

    // toggle the classNames of the dropdown list items to use display: none in styling    
    toggle_dropdown = () => {
        this.state.dropdownClassName === 'hide' ? this.setState({dropdownClassName: ''}) : this.setState({dropdownClassName: 'hide'})
    }

    logoutUser = async () => {
        this.props.history.push('/')
        try{
            await axios.get('/auth/logout')
            this.props.logoutUser()
        } catch(err) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Logout Failed'
              })        
            }
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
                            <li className={this.state.dropdownClassName} onClick={this.logoutUser}>Logout</li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

const mapDispatchToProps = {
    logoutUser
}

export default connect(null, mapDispatchToProps)(withRouter(Header))