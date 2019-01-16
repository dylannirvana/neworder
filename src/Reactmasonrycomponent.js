import React, { Component } from 'react'
import { 
    Card, 
    CardImg, 
    CardBody,
    CardTitle, 
    Input, 
    InputGroup, 
    Container, 
    Row, 
    Jumbotron 
    } from 'reactstrap';
import Papa from 'papaparse'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Masonry from 'react-masonry-component'
    
class Reactmasonrycomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {data: [] };  // State holds gridorder / neworder
        this.handleChange = this.handleChange.bind(this);
        this.updateData = this.updateData.bind(this)
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
           ? this.state.data.map((item) => (  // Object in return 
                <div className="grid-item" key={item.sku}>
                    <Card  >
                        <CardImg src={item.image} />
                        <CardTitle> {item.sku} </CardTitle>
                        <CardBody> {item.name} </CardBody>
                    </Card>  
                </div>                                        
           )) 
           : null         
    }

    componentDidMount() {
        this.masonry.on('layoutComplete', this.handleLayoutComplete)
    }

    componentWillUnmount() {
        this.masonry.off('layoutComplete', this.handleLayoutComplete)
    }

    render() {
    //     const renderData = this.state.data.map((item) => (  // Object in return 
    //             <Masonry key={item.sku}>
    //                 <div>
    //                     <Card  >
    //                         <CardImg src={item.image} />
    //                         <CardTitle> {item.sku} </CardTitle>
    //                         <CardBody> {item.name} </CardBody>
    //                     </Card> 
    //                 </div>
    //             </Masonry>                                        
    //    )) 

        return (
            <div>
                <Jumbotron>
                    <form >
                        <InputGroup>
                            Name:
                            <Input type="file" onChange={this.handleChange} />
                        </InputGroup>
                    </form>
                </Jumbotron>
                
                <div className="album">  
                    <Masonry 
                        ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this) }
                    >           
                        {this.renderData()}
                    </Masonry>                        
                </div>
            </div>          
        );
    }
} // END

export default Reactmasonrycomponent