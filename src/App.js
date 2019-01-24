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
        return  this.state.data.length > 1 
           ?    this.state.data.map((item) => (  // Maps data but not x,y,w,h 
                    <div className="react-grid-item grid-item" key={item.sku}  >
                        <img src={item.image} alt="product" />
                    </div>  
                )) 
           : null         
    } // END 

    render() {     
        console.log("here is my " + this.state) // undefined
        // const layout = {i: 0, x: 0, y: 0, w: 0, h: 0} // ?

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

                        <GridLayout cols={3} className="react-grid-layout grid" width={1000}      >   
                            {this.renderData()} 
                        </GridLayout>   
                        
                    </div>                 
                </div>
            </div>          
        );
    }
} // END

export default App


// w={1} h={1} x={1} y={1} this doesn't make it into parents props layout but defaults somehow to vertical stacking