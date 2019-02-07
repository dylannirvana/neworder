import React, { Component } from 'react'

class Export extends Component {
    // TODO: Put state in Context API or Redux 
    // or pass as props

    constructor(props) {
        super(props)
        this.state = {}
    }

    handleClick(event) {

    }

    // console.log state.data after finished rearranging tiles
    // see if it performs a setState 
    // if not find a way to put SKU:index in state or a state container
    // reduce to form a new array object
    // papa unparse 
    // and save to fs or API

    render() {
        return (
            <div>
                <button onClick={handleClick}>Export CSV</button>
            </div>
        )
    }
}