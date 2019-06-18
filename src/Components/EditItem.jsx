import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserData } from '../redux/reducer'
import Swal from 'sweetalert2'

class EditItem extends Component {
    constructor(){
        super()
        this.state = {
            item_id: null,
            name: '',
            img_url: '',
            description: '',
            tags: ''
        }
    }

    //Set the inital value for name from what was entered in the item wizard input field
    componentWillMount(){
        const {item_id, name, img_url, description, tags} = this.props.item
        this.setState({
            item_id,
            name,
            img_url,
            description,
            tags
        })
    }

    // track user inputs via local state
    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // submit from local state to the db, then update redux state with the db response
    handleSubmit = async (event) => {
        event.preventDefault()
        try{
            const {name, img_url, description, tags, item_id} = this.state
            axios.put('/api/edit-item', {name, img_url, description, tags, item_id})            
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Item edited successfully!',
                timer: 1500
              })
              const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
              this.props.getUserData(res.data)
              this.props.updateItemInfo()
              this.props.toggleEdit()
        } catch(err){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Cannot edit item',
                footer: 'Please try again later.'
              })
        }
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
                        value={this.state.img_url}
                    />
                    <input 
                        className='form-entry'
                        onChange={this.handleInput} 
                        type="text" 
                        name='description' 
                        placeholder='Description'
                        value={this.state.description}
                    />
                    <input 
                        className='form-entry'
                        onChange={this.handleInput} 
                        type="text" 
                        name='tags' 
                        placeholder='Hashtags #'
                        value={this.state.tags}
                    />
                    <button> Submit </button>
                    <button onClick={this.props.toggleEdit}> Cancel</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditItem)
