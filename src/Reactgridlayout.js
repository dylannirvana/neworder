import React, { Component } from 'react'
import { 
    Card, 
    CardImg, 
    CardBody,
    CardTitle, 
    Input, 
    InputGroup, 
    // Container, 
    Col,
    Row, 
    Jumbotron 
    } from 'reactstrap';
import Papa from 'papaparse'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import GridLayout from 'react-grid-layout'
    
class Reactgridlayout extends Component {
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
    
    renderData() {
        return  this.state.data.length > 1 
           ? this.state.data.map((item) => (  // Here is the data 
                <Col  className="grid-item" key={item.sku}>
                    <Card  >
                        <CardImg src={item.image} />
                        <CardTitle> {item.sku} </CardTitle>
                        <CardBody> {item.name} </CardBody>
                    </Card>  
                </Col>  
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
                
                <div className="album">  
                    <GridLayout layout={this.renderData} cols={12} rowHeight={30} width={1200} >   
                        {this.renderData()} 
                    </GridLayout>   

                     {/* <GridLayout className="layout" layout={layout}  cols={12} rowHeight={30} width={1200}>
                        <div className="grid-item" key="a">a</div>
                        <div className="grid-item" key="b">b</div>
                        <div className="grid-item" key="c">c</div>
                    </GridLayout> */}
                </div>
            </div>          
        );
    }
} // END

export default Reactgridlayout