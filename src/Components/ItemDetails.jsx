import React, { Component } from 'react'
import { connect } from 'react-redux'

class ItemDetails extends Component{
    constructor(){
        super()
        this.state = {
            item: null
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


    render(){
        let {item} = this.state
        return(      
            <div>
                <div onClick={this.props.toggle_view_item}>
                    <i className="fas fa-chevron-left"></i>
                </div>
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
            </div>     
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, selected_item, items } = reduxState
    return { authenticated, user_id, selected_item, items }
}

export default connect(mapStateToProps, null)(ItemDetails)
