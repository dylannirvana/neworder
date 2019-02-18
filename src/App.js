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
        };  

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateData = this.updateData.bind(this)
        this.renderData = this.renderData.bind(this)  
        this.handleClick = this.handleClick.bind(this)      
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
            ?   this.state.data.map((item,index) => (  
                    <div className="react-grid-item grid-item" key={index}>
                        {"orig " + console.log(this.gridorder)}
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

//////////////////////////////////////////////////////

// TODO: I need to get new_sku:old_gridorder

    // RERENDER LAYOUT AND CAPTURE NEW INDEX. NEED ENTIRE OBJECT HERE
    onLayoutChange = (layout) => {
        // Mutating a lot of data here... 
        this.newOrder = layout.map(li => ({...li, pos:li.y*3 + li.x}))  
        console.log("layout ", this.newOrder)

        // Can I grab old_gridorder here? This shows actual and new indexes
        this.newOrder = _.sortBy(this.newOrder, 'pos').map(li => parseInt(li.i))
        console.log("Rerendered. Shows actual index to old index = ", this.newOrder)

         // This passes the NEW grid order separately. But here i already have this
         this.newGridorder = this.newOrder.map(i => this.state.data[i]['gridorder'])
         console.log("new grid ", this.newGridorder)

        // this is the only thing i need from new
         this.newsku = this.newOrder.map(i => this.state.data[i]['sku'])
         console.log("new skus ", this.newsku)


        //  // Somehow ive got to get orig grid OLD GRID 
        // this.oldOrder = this.state.data.map((item) => (
        //     {item.gridorder}
        // ))


//////////////////////////////////////////////////////

        // here we are loading the data into it. This is what I am passing to export right now
        this.newOrder = this.newOrder.map(i => this.state.data[i])
        console.log("with data here ", this.newOrder)
       
    } // END

    // ON CLICK PARSE AND SAVE CSV
    handleClick = (event) => {

        // PARSE
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

        // TODO: ALTERNATELY HIDE INPUT AND EXPORT BUTTONS AT TOP
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

                    <div className="note" > Export neworder CSV </div>
                            <Button onClick={this.handleClick} color="secondary" size="sm">Export CSV</Button>


                    </Container>
                </Jumbotron>

                <Container className="album ">
                    <div className="note" > BUG: Drag tiles from text, not image </div>

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
                            yo
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


