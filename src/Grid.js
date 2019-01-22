import React, { Component } from 'react'
import Papa from 'papaparse'
import './App.css'

    
// THIS IS JUST THE CSS GRID WITHOUT STRML

class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {data: [] };  // State holds gridorder / neworder
        this.handleChange = this.handleChange.bind(this);
        this.updateData = this.updateData.bind(this)
        this.renderData = this.renderData.bind(this)
    }

    handleChange(event) {
        event.preventDefault()
        const inventory = event.target.files[0]
        Papa.parse(inventory, {
            header: true,
            complete: this.updateData
        })
    } // END

    updateData(results) {
        const data = results.data
        console.log(data)
        this.setState({data}) // {data:data} 
    }
    
    renderData(props) {    
        return  this.state.data.length > 1 
           ? this.state.data.map((item) => (  
            <div className="react-grid-item grid-item" key={item.sku}  >
                <img src={item.image} alt="product" />
            </div>  
             )) 
           : null         
    }

    render() {     
        console.log("here is my " + this.state) 
        return (
            <div>
                <div>
                    <form >
                        <div>
                            Load up a file here:
                            <input type="file" onChange={this.handleChange} />
                        </div>
                    </form>
                </div>
                
                <div className="album">  
                    <div className="container" >                   
                        <div className="react-grid-layout grid"  width={1000} >                           
                            {this.renderData()} 
                        </div>   
                    </div>
                   
                </div>
            </div>          
        );
    }
} // END

export default Grid


