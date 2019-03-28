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
import 'bootstrap/dist/css/bootstrap.min.css'
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

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen,
        })
      }

    toggleVisible() {  
        this.setState({
            isVisible: !this.state.isVisible,
        })
    }

    handleChange(event) {
        event.preventDefault()
        const inventory = event.target.files[0]
        Papa.parse(inventory, {
            header: true,
            complete: this.updateData
        })
        this.toggleVisible()
    } 

    updateData(results) {
        const data = results.data
        this.setState({data}) 
    }
    
    renderData() {
        return  this.state.data.length > 1
            ?   this.state.data.map((item,index) => (  
                    <Card className="react-grid-item grid-item" key={index} >
                        <CardImg src={item.image} top width="100%" alt="Product" />
                        <CardBody>
                            <CardTitle className="name"> {item.name} </CardTitle>
                            <CardText className="designer" > {item.designer} </CardText>
                            <CardSubtitle className="sku" > {item.config_sku} <span>{index}</span> </CardSubtitle>
                            {/* <CardText className="index" > {index} </CardText> */}
                        </CardBody>
                    </Card>
                )) 
            : null
    } 

    onLayoutChange = (layout) => {
        this.newOrder = layout.map(li => ({...li, pos:li.y*5 + li.x}))  
        this.newOrder = _.sortBy(this.newOrder, 'pos').map(li => parseInt(li.i))
        this.newOrder = this.newOrder.map((i, seqno) => ({
            config_sku: this.state.data[i].config_sku,
            grid_order: this.state.data[seqno].grid_order
          }));
       console.log(this.newOrder)      
    } 

    handleClick = (event) => {
        const csv = Papa.unparse(this.newOrder) 
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
            x: index % 5,
            y: Math.floor(index / 5),
            w: 1,
            h: 1,
            i: index.toString()
        }))

        const columns = 5

        return (
            <Container>
                 {/* <div> */}
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
                    {/* <Container> */}
                        { !this.state.isVisible ? this.importButton() : null }
                        { this.state.isVisible ? this.exportButton() : null }
                    {/* </Container> */}
                </Jumbotron>

                {/* <Container className="album "> */}
                    <GridLayout  
                        compactType="horizontal" 
                        useCSSTransforms={true} 
                        cols={columns} 
                        layout={layout}
                        onLayoutChange={this.onLayoutChange}
                        verticalCompact={true}
                        preventCollision={false}
                        isResizable={false}
                        margin={[20, 10]} 
                        rowHeight={240} 
                        className="react-grid-layout grid" 
                        width={930} 
                    >
                        {this.renderData()}
                    </GridLayout>

                {/* </Container> */}
            {/* </div>  */}
            </Container>
           
        );
    }
} 

export default App

