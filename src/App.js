import React, { Component } from 'react'
import { 
    Card, 
    CardImg, 
    Input, 
    InputGroup, 
    Container, 
    Jumbotron 
    } from 'reactstrap';
import Papa from 'papaparse'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import GridLayout from 'react-grid-layout'
    
class App extends Component {
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
            <Card className="grid-item" key={item.sku} >

            {/* <Card className="grid-item" data-grid={{ x: 3, y: 0, w: 1, h: 1.5}} key={item.sku} > */}       
                <CardImg src={item.image} />
                {/* <CardTitle> {item.sku} </CardTitle>
                <CardBody> {item.name} </CardBody> */}
            </Card>  
             )) 
           : null         
    }

    render() {
        const layout = [
            { x: 3, y: 0, w: 0, h: 1 },
          ];

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
                    <Container>

                    {/* <GridLayout cols={3} rowHeight={340} width={1200} compactType={"horizontal"}>    */}
                   
                    <GridLayout cols={3} layout={layout}  rowHeight={340} width={1200} compactType={"horizontal"}>   
                            {this.renderData()} 
                        </GridLayout>   
                    </Container>
                   
                </div>
            </div>          
        );
    }
} // END

export default App
