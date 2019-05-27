import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ItemWizard from './ItemWizard'
import ItemDetails from './ItemDetails'


class Library extends Component{
    constructor(){
        super()
        this.state = {
            viewItem: false,
            selected_item_id: 0,
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
                {this.state.viewItem ? null : <ItemWizard/>}
            </main>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, items } = reduxState
    return { authenticated, items }
}

export default connect(mapStateToProps, null)(withRouter(Library))