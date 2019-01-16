import React, { Component } from 'react'
import { 
    // Card, 
    // CardImg, 
    // CardText, 
    // CardBody,
    // CardTitle, 
    // CardSubtitle, 
    // Button, 
    Input, 
    InputGroup, 
    Collapse, 
    Navbar, 
    NavbarToggler, 
    NavbarBrand, 
    Nav, 
    NavItem, 
    NavLink, 
    Container, 
    Row, 
    Col, 
    Jumbotron 
    } from 'reactstrap';
import Papa from 'papaparse'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// stashing this here
// handleChange(event) {
//     event.preventDefault()
//     const inventory = event.target.files[0]
//     Papa.parse(inventory, {
//         header: true,
//         complete: function(results) {
//             this.setState({value: results.data})
//         }
//     })
// }


// const ItemCard = (props) => {
//     return (
//         <Row>
//             <Col>
//                 <Card  >
//                     <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
//                     <CardBody>
//                         <CardTitle>Card title </CardTitle>
//                         <CardSubtitle>Card subtitle</CardSubtitle>
//                         <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
//                         <Button>Button</Button>
//                     </CardBody>
//                 </Card>
//             </Col>
//             {/* <Col>
//                 <Card>
//                     <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
//                     <CardBody>
//                         <CardTitle>Card title</CardTitle>
//                         <CardSubtitle>Card subtitle</CardSubtitle>
//                         <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
//                         <Button>Button</Button>
//                     </CardBody>
//                 </Card>
//             </Col>
//             <Col>
//                 <Card>
//                     <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
//                     <CardBody>
//                         <CardTitle>Card title</CardTitle>
//                         <CardSubtitle>Card subtitle</CardSubtitle>
//                         <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
//                         <Button>Button</Button>
//                     </CardBody>
//                 </Card>
//             </Col> */}
//         </Row>
//     );
//   };

const Grid = (props) => (
    <div>
        {this.state.value}
    </div>
)
    
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: []
        }
    }

    uploadHandler = (e) => {
        e.preventDefault();
        const inventory = e.target.files[0]
        Papa.parse(inventory, {
          header: true,
          complete: function(results) {
            let items = results.data
            console.log(items) // I have access to the data
        
            // this.setState({itemList: items}) // TypeError: this.setState is not a function
          }
        })
      }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="lg">
                    <NavbarBrand href="/">Grid Order Tool</NavbarBrand>
                    <NavbarToggler  />
                    <Collapse >
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Hello Colleen!</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/dylannirvana/gridorder">Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Import</h1>                    
                                <InputGroup>
                                    <Input type="file" value={this.state.value} name="inputCSV" onChange={this.uploadHandler} />
                                </InputGroup>                          
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h1>The Grid</h1>  
                                <Grid />
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}
    export default App;
