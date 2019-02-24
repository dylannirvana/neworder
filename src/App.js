import React, { Component } from 'react'
import Papa from 'papaparse'
import GridLayout from 'react-grid-layout' 
import _ from 'lodash'
import FileSaver, {saveAs} from 'file-saver'
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
            data: [], // on load
            isOpen: false,
        }

        this.toggle = this.toggle.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateData = this.updateData.bind(this)
        this.renderData = this.renderData.bind(this)  
        this.handleClick = this.handleClick.bind(this) 
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen,
        });
      }

    handleChange(event) {
        event.preventDefault()
        const inventory = event.target.files[0]
        Papa.parse(inventory, {
            header: true,
            complete: this.updateData
        })
        // export button becomes visible
       
    } // END

    updateData(results) {
        const data = results.data
        this.setState({data}) // {data:data}
    }
    
    renderData() {
        return  this.state.data.length > 1
            ?   this.state.data.map((item,index) => (  
                    <div className="react-grid-item grid-item" key={index}>
                        <div> {item.name} </div>
                        <div> {item.grid_order} </div> 
                        <img src={item.image} alt="product" />
                        <div> {item.config_sku} </div>
                        <div> {index} </div>     
                    </div>    
                )) 
            : null
    } // END

    onLayoutChange = (layout) => {
        this.newOrder = layout.map(li => ({...li, pos:li.y*3 + li.x}))  
        this.newOrder = _.sortBy(this.newOrder, 'pos').map(li => parseInt(li.i))

        this.newOrder = this.newOrder.map((i, seqno) => ({
            config_sku: this.state.data[i].config_sku,
            grid_order: this.state.data[seqno].grid_order
          }));
       console.log(this.newOrder)
       
    } // END

    handleClick = (event) => {

        // Parse
        const csv = Papa.unparse(this.newOrder) 
        console.log("csv from parser = ", csv)

        // saveAs(csv)
        var file = new File([csv], "neworder.csv", {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(file);
    }

    render() {
        const {data} = this.state
        const layout = data && data.map((item, index) => ({
            x: index % 3,
            y: Math.floor(index / 3),
            w: 1,
            h: 1,
            i: index.toString()
        }))

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
                        <div className="import">
                            <h4> Import CSV </h4>
                            <Input  type="file" onChange={this.handleChange}  />
                        </div>

                        <div className="exportButton">
                            <h4> Export CSV </h4>
                            <Button  onClick={this.handleClick} color="secondary" size="sm">Export CSV</Button>
                        </div>

                    </Container>
                </Jumbotron>

                <Container className="album ">

                    <GridLayout  
                        compactType="horizontal" 
                        useCSSTransforms={true} 
                        cols={3} 
                        layout={layout}
                        onLayoutChange={this.onLayoutChange}
                        verticalCompact={true}
                        isResizable={false}
                        margin={[120, 20]} 
                        rowHeight={300} 
                        className="react-grid-layout grid" 
                        width={1200} 
                    >
                        {this.renderData()}
                    </GridLayout>

                    <Navbar color="light" light expand="md">
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            {/* <div className="note" > Export neworder CSV </div>
                            <Button onClick={this.handleClick} color="secondary" size="sm">Export CSV</Button> */}
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


