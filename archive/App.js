import React, { Component } from 'react'
import Papa from 'papaparse'
import GridLayout from 'react-grid-layout'
import './App.css'
    
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {data: []};  
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
           ? // CHILD
           this.state.data.map((item) => (  
                <div className="react-grid-item grid-item" key={item.sku}  >                
                    <img src={item.image} layout={this.state.layout}  alt="product"   />
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
                    
                    <GridLayout cols={3} rowHeight={300} layout={this.renderData.layout} className="react-grid-layout grid" width={1000}  >   
                        {this.renderData()} 
                    </GridLayout>   
                </div>
            </div>          
        );
    }
} // END

export default App


// TODO: pass layout from state to props


// data-grid={{i: item.name, x: 0, y: 0, w: 0, h: 0}}
// layout={this.renderData()} 
// x={1} y={1} w={1} h={1} 
// layout={{i: i.toString(), x: 0, y: 0, w: 0, h: 0}}