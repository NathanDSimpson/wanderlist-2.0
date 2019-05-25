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
        let drowdownMenu
        if (this.props.authenticated){
            drowdownMenu = (
                <ul>
                    <li className={this.state.dropdownClassName} onClick={() => {this.props.history.push('/items'); this.toggle_dropdown()}}>Items</li>
                    <li className={this.state.dropdownClassName} onClick={() => {this.props.history.push('/lists'); this.toggle_dropdown()}}>Lists</li>
                    <li className={this.state.dropdownClassName} onClick={() => {this.props.history.push('/trips'); this.toggle_dropdown()}}>Trips</li>
                    <li className={this.state.dropdownClassName} onClick={() => {this.logoutUser(); this.toggle_dropdown()}}>Logout</li>
                </ul>
            )
        } else {
                drowdownMenu = (
                    <ul>
                        <li className={this.state.dropdownClassName} onClick={() => {this.props.history.push('/login'); this.toggle_dropdown()}}>Log In</li>
                        <li className={this.state.dropdownClassName} onClick={() => {this.props.history.push('/register'); this.toggle_dropdown()}}>Register</li>
                    </ul>
                )
        }

        return(
            <header className='page-header'>
                <div>
                    WanderList
                </div>
                <nav>
                    <div className='user-menu'>
                        <div className='user-icon'  onClick={this.toggle_dropdown}>
                            <div>{this.props.authenticated ? this.props.firstname : null}</div>
                            <i className="fas fa-user"></i>
                        </div>
                        <ul>
                            {drowdownMenu}
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, firstname } = reduxState
    return { authenticated, firstname} 
}

const mapDispatchToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))