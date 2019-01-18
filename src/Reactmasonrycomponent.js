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

const masonryOptions = {
    transitionDuration: 0
};
    
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
                <Card className="grid-item" key={item.sku}>
                    <CardImg src={item.image} />
                    <CardTitle> {item.sku} </CardTitle>
                    <CardBody> {item.name} </CardBody>
                </Card>          
                
                    // <li className="grid-item">
                    //     <img src={item.sku} />
                    // </li>
           )) 
           : null         
    }

    render() {

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
                <h3>react-masonry-component</h3>
                <div className="album">  
                    <Masonry
                        className={'grid'} // default ''
                        elementType={'div'} // default 'div'
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    >
                        {this.renderData}
                    </Masonry>
                </div>
            </div>          
        );
    }
} // END

export default Reactmasonrycomponent