import React, { Component } from 'react'
import Papa from 'papaparse'
import GridLayout from 'react-grid-layout' 
import {
    Jumbotron,
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Input,
} from 'reactstrap'

import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], // load
            // newdata: [], // change
            isOpen: false,
        };  

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateData = this.updateData.bind(this)
        this.renderData = this.renderData.bind(this)       
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
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
        this.setState({data}) // {data:data}
    }

    renderData() {
           return  this.state.data.length > 1  
              ?    this.state.data.map((item,index) => (  
                       <div className="react-grid-item grid-item" key={index}  data-grid={{x: index % 3, y: Math.floor(index / 3), w: 1, h: 1}}>
                             <div> {item.name} </div>
                             <div> {item.gridorder} </div>
                             <div> {item.designer} </div>
                            <img src={item.image} alt="product" />
                            <div> {item.sku} </div>
                            <div> {index} </div>
                       </div>
                   ))
              : null
    } // END

    handleClick(event) {
            console.log(`click handler ${this.state.data}`)
        
            // const neworder = event.target.data
        // Papa.unparse(neworder, {
        //     // passes csv to outputData
        //     complete: this.outputData
        // })

    } // END



///////////////////////////////////////////


    // TODO:
    // 0. Please do not refactor the application. It works and I do not want to use STRML's globals
    // 1. When app re-renders, 
    //         save new object
    //         [
    //            {  sku:grid_order },
    //            {  sku:grid_order },
    //            {  sku:grid_order },
    //          ] 
    //         to state. The object is composed of sku:grid_order key:value pairs
    // 2. On click (export button), pass new layout obj to Papa.unparse (JSON to CSV)
    // 3. Save returned CSV to disc. This export only needs sku:grid_order 


///////////////////////////////////////////

    

    componentDidUpdate() {
        
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">GO App - grid order tool</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Components</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                            Options
                            </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem>
                                Option 1
                            </DropdownItem>
                            <DropdownItem>
                                Option 2
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                Reset
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                
                <Jumbotron >
                    <Container>
                        <h4> Import CSV </h4>
                    <Input type="file" onChange={this.handleChange}  />
                    </Container>
                </Jumbotron>

                <Container className="album ">
                    <div className="note" > BUG: Drag tiles from text, not image </div>
                    <div className="note" > BUG: Drag order will be changed </div>

                    <GridLayout onLayoutChange={this.handleLayoutChange} cols={3} margin={[120, 20]} rowHeight={300} className="react-grid-layout grid" width={1200} >
                        {this.renderData()}
                    </GridLayout>

                    <Navbar color="light" light expand="md">
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <div className="note" > NOTE: The export function is under construction </div>
                            <Button onClick={this.handleClick} color="secondary" size="sm">Export CSV</Button>
                        </NavItem>
                       
                        </Nav>
                    </Collapse>
                </Navbar>

                </Container>
            </div> // END
        );
    }
} // END

export default App


