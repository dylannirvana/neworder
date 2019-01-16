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
        
    class App extends Component {
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
                        <Container>           
                            <Row className="grid" > {this.renderData()} </Row> 
                        </Container>                        
                    </div>
                </div>          
            );
        }
    } // END

    export default App