import React, { Component } from 'react'

class ItemIcon extends Component{

    render(){
        return(
            <div className='item-icon'>
                <div>
                    <img src={this.props.item.img_url} alt={this.props.item.name}/>
                </div>
                <div className='item-name'>
                    {this.props.item.name}
                </div>
            </div>
        )
    }
}

export default ItemIcon