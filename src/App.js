import React, { Component } from 'react'
import Papa from 'papaparse'
import GridLayout from 'react-grid-layout'
import './App.css'
    
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {data: [] };  // State holds gridorder / neworder
        this.handleChange = this.handleChange.bind(this);
        this.updateData = this.updateData.bind(this)
        // this.renderData = this.renderData.bind(this)
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
        
    renderData() {  
        return  this.state.data.length > 1  // checks I have the array object
           ?    this.state.data.map((item) => (  // maps data but not x,y,w,h 
                    // this is the child
                    <div className="react-grid-item grid-item" key={item.sku} > 
                        <img src={item.image} alt="product" />
                    </div>  
                )) 
           : null         
    } // END 

    render() {     
        return (
            <div> 
                <form >
                    <input type="file" onChange={this.handleChange} />
                </form>            
                <div className="album container">  
                    {/* this is the parent. and passing default xywh values doesnt associate with props > layout */}
                    <GridLayout cols={12} rowHeight={300} className="react-grid-layout grid" width={1200}      >   
                        {this.renderData()} 
                    </GridLayout>   
                </div>
            </div>          
        );
    }
} // END

export default App


