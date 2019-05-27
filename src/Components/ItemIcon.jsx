import React, { Component } from 'react'
import { connect } from 'react-redux'
import { select_item } from '../redux/reducer'

class ItemIcon extends Component{

    view_item = () => {
        this.props.select_item({item_id: this.props.item.item_id})
        this.props.toggle_view_item()
    }
    
    render(){
        let url = this.props.item.img_url !== '' ? this.props.item.img_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQoANe0YNquFbkjBKomnGyoG7CNvYbq153oAOW3DEs-iDA7s5y'
        return(
            <div className='item-icon' onClick={this.view_item}>
                <div>
                    <img src={url} alt={this.props.item.name}/>
                </div>
                <div className='item-name'>
                    {this.props.item.name}
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (reduxState) => {
//     const { authenticated, firstname } = reduxState
//     return { authenticated, firstname} 
// }

const mapDispatchToProps = {
    select_item
}

export default connect(null, mapDispatchToProps)(ItemIcon)