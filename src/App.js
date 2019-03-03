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
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardText,
    CardSubtitle,
} from 'reactstrap'

import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import './App.css'
import logo from './images/logo.png'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], 
            isOpen: false,
            isVisible: false, 
        }

        this.toggle = this.toggle.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateData = this.updateData.bind(this)
        this.renderData = this.renderData.bind(this)  
        this.handleClick = this.handleClick.bind(this) 
        this.toggleVisible = this.toggleVisible.bind(this) 
    }

    // TODO:
    // 1. toggle visibility √
    // 2. column size correx √
    // 3. multiple column variable X
    // 4. style √
    // 5. multiple select

    // Be sure to complete documentation and formally present
    //////////////

    // Toggle open close in navbar
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen,
        })
      }

    // Toggle visibility of input and output buttons
    toggleVisible() {  //
        this.setState({
            isVisible: !this.state.isVisible,
        })
    }

    // Handle change event for upload
    handleChange(event) {
        event.preventDefault()
        const inventory = event.target.files[0]
        Papa.parse(inventory, {
            header: true,
            complete: this.updateData
        })

        // Toggle visibility of buttons
        this.toggleVisible()

    } 

    // Original grid order
    updateData(results) {
        const data = results.data
        this.setState({data}) // {data:data}
    }
    
    // Renders grid
    renderData() {
        return  this.state.data.length > 1
            ?   this.state.data.map((item,index) => (  

                        <Card className="react-grid-item grid-item" key={index} >
                            <CardImg src={item.image} top width="100%" alt="Product" />
                            <CardBody>
                                <CardTitle className="name"> {item.name} </CardTitle>
                                <CardText className="designer" > {item.designer} </CardText>
                                <CardSubtitle className="sku" > {item.config_sku} </CardSubtitle>
                                <CardText className="index" > {index} </CardText>
                                {/* <Button>Button</Button> */}
                            </CardBody>
                        </Card>
                )) 
            : null
    } // END

    // Maintain draggable layout
    onLayoutChange = (layout) => {
        this.newOrder = layout.map(li => ({...li, pos:li.y*3 + li.x}))  
        this.newOrder = _.sortBy(this.newOrder, 'pos').map(li => parseInt(li.i))

        // Reordered key:value pair
        this.newOrder = this.newOrder.map((i, seqno) => ({
            config_sku: this.state.data[i].config_sku,
            grid_order: this.state.data[seqno].grid_order
          }));
       console.log(this.newOrder)
       
    } // END

    // Parser and save file
    handleClick = (event) => {
        console.log("hey")
        // Parse
        const csv = Papa.unparse(this.newOrder) 
        console.log("csv from parser = ", csv)

        // saveAs(csv)
        var file = new File([csv], "neworder.csv", {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(file);
    }

    importButton = () => (
        <div className="import">
            <h4> GO App </h4> 
            <p className="summary" >Welcome to the Grid Order Application. Please upload a properly formatted Custom Export from Magento. And reorder the tiles in the UI.</p>                    
            <Input type="file" onChange={this.handleChange}  />
        </div>
    )

    exportButton = () => (
        <div className="exportButton">
            <h4> Export CSV </h4>
            <p className="summary" >Now that you have the New Order, export the file. And upload it into the Magento Custom Module. This will change the grid order.</p>
            <Button onClick={this.handleClick} color="secondary" size="sm">Save New Order</Button>        
        </div>
    )

    render() {
        const {data} = this.state
        const layout = data && data.map((item, index) => ({
            x: index % 3,
            y: Math.floor(index / 3),
            w: 1,
            h: 1,
            i: index.toString()
        }))

        const columns = 3

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand className="logo" href="/"> 
                        <img src={logo} alt="logo" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                        </NavItem>
                        <NavItem>
                        {/* <NavLink target="_blank" href="https://github.com/dylannirvana/neworder/">GO App</NavLink> */}
                        </NavItem>
                        <NavItem>
                            <NavLink target="_blank" href="https://github.com/dylannirvana/neworder/issues">Register issues here</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                            How to use
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem target="_blank" href="https://github.com/dylannirvana/neworder" >
                                        The GO App is an Agile application that allows you to resequence sections of the product grid order using a visual tool.
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                
                <Jumbotron >
                    <Container>
                        { !this.state.isVisible ? this.importButton() : null }
                        { this.state.isVisible ? this.exportButton() : null }

                    </Container>
                </Jumbotron>

                <Container className="album ">
                    <GridLayout  
                        compactType="horizontal" 
                        useCSSTransforms={true} 
                        cols={columns} 
                        layout={layout}
                        onLayoutChange={this.onLayoutChange}
                        // verticalCompact={true}
                        preventCollision={false}
                        isResizable={false}
                        margin={[120, 40]} 
                        rowHeight={300} 
                        className="react-grid-layout grid" 
                        width={1200} 
                    >
                        {this.renderData()}
                    </GridLayout>

                </Container>
            </div> // END
        );
    }
} // END

export default App

