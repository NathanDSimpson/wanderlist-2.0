import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'


class Register extends Component{
    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    
    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async event => {
        event.preventDefault()
        const { firstname, lastname, email, password, confirmPassword } = this.state
        if (password !== confirmPassword){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Your passwords do not match'
              })
            return
        }
        try {
            await axios.post('/auth/register', {firstname, lastname, email, password})
            // const response = await axios.post('/auth/register', {firstname, lastname, email, password}) // register in out db
            // this.props.registerUser({firstname, lastname, email, id: response.data.user.id, authenticated: true})// dispatch to store
            // this.props.history.push('/items')
        } catch(err){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Registration Failed'
              })
        }
    }

    render(){
        return(
            <div>
            <form onSubmit={this.handleSubmit}>
                <input 
                    className='form-entry'
                    onChange={this.handleInput} 
                    type="text" 
                    name='firstname' 
                    placeholder='First Name'
                />
                <input 
                    className='form-entry'
                    onChange={this.handleInput} 
                    type="text" 
                    name='lastname' 
                    placeholder='Last Name'
                />
                <input 
                    className='form-entry'
                    onChange={this.handleInput} 
                    type="text" 
                    name='email' 
                    placeholder='Email'
                />
                <input 
                    className='form-entry'
                    onChange={this.handleInput} 
                    type="password" 
                    name='password' 
                    placeholder='Password'
                />
                <input 
                    className='form-entry'
                    onChange={this.handleInput} 
                    type="password" 
                    name='confirmPassword' 
                    placeholder='Re-enter Password'
                    />
                <button className='register-button'> SUBMIT </button>
            </form>
            <div
            className='register-prompt'
            >
                <div>
                    Already have an account? 
                </div>
                <div>
                    <Link to='/login'> Log In </Link>
                </div>
            </div>
        </div>
        )
    }
}

export default Register