import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemWizard from './ItemWizard'
import ItemDetails from './ItemDetails'


class Library extends Component{
    constructor(){
        super()
        this.state = {
            viewItem: false,
        }
    }

    toggle_view_item = () => {
        this.setState({
            viewItem: !this.state.viewItem
        })
    }

    render(){
        return(
            <main>
                {this.state.viewItem 
                ? 
                <ItemDetails toggle_view_item={this.toggle_view_item}/> 
                : 
                <ItemWizard toggle_view_item={this.toggle_view_item}/>}
            </main>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, items } = reduxState
    return { authenticated, items }
}

export default connect(mapStateToProps, null)(Library)