import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ItemDetails extends Component{
    constructor(){
        super()
        this.state = {

        }
    }


    render(){
        return(           
            <main>

            </main>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, items } = reduxState
    return { authenticated, user_id, items }
}

export default connect(mapStateToProps, null)(withRouter(ItemDetails))
