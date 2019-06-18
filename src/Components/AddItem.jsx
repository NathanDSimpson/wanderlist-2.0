import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserData } from '../redux/reducer'
import Swal from 'sweetalert2'

class AddItem extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            img_url: '',
            description: '',
            tags: ''
        }
    }

    //Set the inital value for name from what was entered in the item wizard input field
    componentWillMount(){
        this.setState({
            name:  this.props.item_name
        })
    }

    // track user inputs via local state
    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    // submit from local state to the db, then update redux state with the db response
    handleSubmit = async (event) => {
        event.preventDefault()
        const { img_url, description, tags, name } = this.state
        try {
            // add to db
            await axios.post('/api/add-item', { user_id: this.props.user_id, name, img_url, description, tags }) 
            // get updated info from db for redux
            const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
            // update redux
            this.props.getUserData(res.data) 
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Item added successfully!',
                showConfirmButton: false,
                timer: 1500
              })
        } catch(err){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Failure adding item'
              })    
        }
        this.props.toggleAdd() // passed as props from Items.jsx to toggle this component
    }

    render(){
        return(
            <>
            <div className='add-item-form'>
                <form onSubmit={this.handleSubmit}> 
                    <input 
                        className='form-entry'
                        onChange={this.handleInput} 
                        type="text" 
                        name='name' 
                        placeholder='Name'
                        value={this.state.name}
                    />
                    <input 
                        className='form-entry'
                        onChange={this.handleInput} 
                        type="text" 
                        name='img_url' 
                        placeholder='Image URL'
                    />
                    <input 
                        className='form-entry'
                        onChange={this.handleInput} 
                        type="text" 
                        name='description' 
                        placeholder='Description'
                    />
                    <input 
                        className='form-entry'
                        onChange={this.handleInput} 
                        type="text" 
                        name='tags' 
                        placeholder='Hashtags #'
                    />
                    <button> Submit </button>
                </form>
            </div>
            </>
        )
    }

}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id } = reduxState
    return { authenticated, user_id } 
}

const mapDispatchToProps = {
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddItem))
