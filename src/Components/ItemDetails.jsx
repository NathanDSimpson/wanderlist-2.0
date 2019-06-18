import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserData } from '../redux/reducer'
import axios from 'axios'
import Swal from 'sweetalert2'
import EditItem from './EditItem'

class ItemDetails extends Component{
    constructor(){
        super()
        this.state = {
            item: null,
            showMenu: false,
            editItem: false
        }
    }

    componentWillMount(){
        let item = this.props.items.filter(item => {
            return item.item_id === this.props.selected_item
        })
        this.setState({
            item: item[0]
        })
    }

    updateItemInfo = () => {
        let item = this.props.items.filter(item => {
            return item.item_id === this.props.selected_item
        })
        this.setState({
            item: item[0]
        })
    }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }
    
    toggleEdit = () => {
        this.setState({
            editItem: !this.state.editItem
        })
    }

    deleteItem = async () => {
        try{
            await axios.post(`/api/delete`, {item_id: this.state.item.item_id})
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Item deleted successfully!',
                timer: 1500
              })
              const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
              this.props.getUserData(res.data)
              this.props.toggle_view_item()
        } catch(err){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Cannot delete item',
                footer: 'Please try again later.'
              })
        }
    }


    render(){
        const {item} = this.state
        const expandMenu = this.state.showMenu ? 'none' : ''
        const itemMenu = this.state.showMenu ? '': 'none'
        const itemDetails = (
            <div>
                <div onClick={this.props.toggle_view_item}>
                    <i className="fas fa-chevron-left"></i>
                </div>
                <div className='item-details-main'>
                    <main className='item-details'>
                        <img src={item.img_url} alt={item.name}/>
                        <ul>
                            <li>
                                {item.name}
                            </li>
                            <li>
                                {item.description}
                            </li>
                            <li>
                                {item.tags}
                            </li>
                        </ul>
                    </main>
                    <div>
                        <div className={expandMenu} onClick={this.toggleMenu}> Expand Menu</div>
                        <div className={itemMenu} onClick={this.toggleMenu}> Back</div>
                        <div className={itemMenu} onClick={this.toggleEdit}> Edit Item </div>
                        <div className={itemMenu} onClick={this.deleteItem} > Delete Item</div>
                        <div className={itemMenu} > Add Item to List</div>
                    </div>
                </div>
            </div>
        )

        console.log(`111`, this.props)

        return(      
            <div>
                {this.state.editItem ? <EditItem item={this.state.item} toggleEdit={this.toggleEdit} updateItemInfo={this.updateItemInfo}/> : itemDetails}
            </div>     
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, selected_item, items } = reduxState
    return { authenticated, user_id, selected_item, items }
}

const mapDispatchToProps = {
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails)
