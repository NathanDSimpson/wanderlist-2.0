import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { logoutUser, loginUser, getUserData } from '../redux/reducer'
import axios from 'axios'

class Header extends Component{
    state = {
        dropdownClassName: ''
    }

    // Check if the server has a session
    // dispatch user_id from session to db to get info and update redux
    async componentWillMount(){
        try {
            const res = await axios.get('/auth/continue-session')
            const { user_id, firstname, lastname, email } = res.data
            if (res.data){ // res.data is an empty sting if there is no the server has no session
                this.props.loginUser({ user_id, firstname, lastname, email, authenticated: true })
                const res = await axios.post('/api/user-data', {user_id})
                this.props.getUserData(res.data)
            } else {
                this.props.history.push('/')
            }
        } catch(err){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Please refresh your page and log in again.'
              })        
        }
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
                    <li className={this.state.dropdownClassName} onClick={() => {this.props.history.push('/library'); this.toggle_dropdown()}}>Items</li>
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
    logoutUser,
    loginUser,
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))