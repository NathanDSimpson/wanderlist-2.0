import React, { Component } from 'react'

class ItemIcon extends Component{

    render(){
        let url = this.props.item.img_url !== '' ? this.props.item.img_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQoANe0YNquFbkjBKomnGyoG7CNvYbq153oAOW3DEs-iDA7s5y'
        return(
            <div className='item-icon'>
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

export default ItemIcon