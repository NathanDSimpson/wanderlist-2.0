import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ItemIcon from './ItemIcon'
import AddItem from './AddItem'


class ItemWizard extends Component{
    constructor(){
        super()
        this.state = {
            newItem: '',
            searchValue: '',
            add_item: false
        }
    }

    // track user inputs via local state
    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    toggle_add_item = () => {
        this.setState({
            add_item: !this.state.add_item
        })
    }

    render(){
        let items
        if (this.state.searchValue === ''){
            items = this.props.items.map(item => (
                <ItemIcon item={item} key={item.item_id}/>
            ))
        } else {
            let filtered_items = this.props.items.filter(item => {
                let searchFor = this.state.searchValue.toLowerCase()
                let searchIn = item.description ? item.description.toLowerCase() : ''
                searchIn += item.name ? item.name.toLowerCase() : ''
                searchIn +=  item.tags ? item.tags.toLowerCase() : ''
                return searchIn.includes(searchFor) 
            })
            items = filtered_items.map(item => (
                <ItemIcon item={item} key={item.item_id}/>
            ))
        }

        return(
            
            <main>
                {this.state.add_item ? <AddItem item={this.state.newItem} toggleAdd={this.toggle_add_item}/> : (
                    <div>
                        <nav className='search-and-additem-bar'>
                            <div className='add-item'>
                                <i className="fas fa-plus" onClick={this.toggle_add_item}></i>
                                <input 
                                        className='form-entry'
                                        onChange={this.handleInput} 
                                        type="text" 
                                        name='newItem' 
                                        placeholder='add item'
                                />
                            </div>
                            <input className='search-bar'
                                className='form-entry'
                                onChange={this.handleInput} 
                                type="text" 
                                name='searchValue' 
                                placeholder='search'
                            />
                        </nav>
                        <div className='item-icons'>
                            {items}
                        </div>
                    </div>
                )}
            </main>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, items } = reduxState
    return { authenticated, user_id, items }
}

export default connect(mapStateToProps, null)(withRouter(ItemWizard))
