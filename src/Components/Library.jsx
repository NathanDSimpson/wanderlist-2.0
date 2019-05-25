import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ItemWizard from './ItemWizard'


class Library extends Component{
    constructor(){
        super()
        this.state = {
            addItem: false,
            viewItem: false,
            editItem: false,
            selected_item_id: 0,
            searchValue: ''
        }
    }

    toggle_add_item = () => {
        this.setState({
            addItem: !this.state.addItem
        })
    }
    toggle_view_item = () => {
        this.setState({
            viewItem: !this.state.viewItem
        })
    }
    toggle_edit_item = () => {
        this.setState({
            editItem: !this.state.editItem
        })
    }

    render(){
        return(
            <main>
                <ItemWizard/>
            </main>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, items } = reduxState
    return { authenticated, items }
}

export default connect(mapStateToProps, null)(withRouter(Library))


// render(){
//     let items
//     if (this.state.searchValue === ''){
//         items = this.props.items
//     } else {
//         items = this.props.items.filter( item =>  {
//             let searchFor = this.state.searchValue.toLowerCase()
//             let searchIn = item.description ? item.description.toLowerCase() : ''
//             searchIn += item.name ? item.name.toLowerCase() : ''
//             searchIn +=  item.tags ? item.tags.toLowerCase() : ''
//             return searchIn.includes(searchFor) 
//             })
//     }
//     let icons = items.map((item) =>  <ItemIcon item={item} key={item.item_id}/> )

//     let backButton = (<i className="fas fa-chevron-left"></i>)
//     let addButton = (<i className='add-button' className="fas fa-plus">  Item</i>)

//     let search
//         if (!this.state.addItem){
//             search = (
//                 <input 
//                     onChange={this.handleInput} 
//                     type="text" 
//                     name='searchValue' 
//                     placeholder='Search'
//                 />
//             )            
//         }

//     return(
//         <div>
//             <div className='items-nav'>
//                 <div onClick={this.toggleAdd}> {this.state.addItem ? backButton : addButton} </div>
//                 {search}
//             </div>
//             {this.state.addItem ? <AddItem toggleAdd={this.toggleAdd}/> : <section className='items-library'> {icons} </section>}
//         </div>
//     )
// }