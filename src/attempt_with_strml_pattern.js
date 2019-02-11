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

// STRML
// const originalLayout = getFromLS("layout") || [];

//STRML
class App extends Component {
    // static defaultProps = {
    //     onLayoutChange: function() {}
    // }

    constructor(props) {
        super(props);
        this.state = {
            data: [], // load
            // newdata: [], // change
            isOpen: false,
            // export: [] 
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
        // console.log(data)
        this.setState({data}) // {data:data}
    }

// load
    renderData() {
           return  this.state.data.length > 1  
              ?    this.state.data.map((item,index) => (  
                       <div className="react-grid-item grid-item" key={index}  data-grid={{x: index % 3, y: Math.floor(index / 3), w: 1, h: 1}}>
                             <div> {item.name} </div>
                             <div> {item.designer} </div>
                            <img src={item.image} alt="product" />
                            <div> {item.sku} </div>
                            <div> {index} </div>
                            {/* {console.log(item.sku, index)} */}
                            {/* {this.setState(this.state.data)} */}

                       </div>
                    //    layout = this.state.data // something like this
                    //     this.setState(layout) // setState somewhere here
                // ok so here is the object getting mapped out to the ui. when it reforms 
                // is there a setState that holds the new object?

                   ))
              : null
    } // END

    // handleCSV(event) {
    //     // console.log(`click handler ${this.state.data}`)
    //     // const neworder = event.target.data
    //     // Papa.unparse(neworder, {
    //     //     // passes csv to outputData
    //     //     complete: this.outputData
    //     // })
    // }   



///////////////////////////////////////////


    // TODO:
    // 0. Please do not refactor the application. It works and I do not want to use STRML's globals
    // 1. When app re-renders, save new obj to state
    // 2. On click (export button) pass new layout obj to Papa.unparse
    // 3. Save returned CSV to disc


///////////////////////////////////////////





    // handleLayoutChange(layout) {
    //     // const keys = Object.keys(layout)
    //     // // console.log(`yo baby ${values[0]}`)

    //     // for (const key of keys) {
    //     //     console.log(key)
    //     //    }
    //     saveToLS("layout", layout)
        

    // } 

    

    // componentDidUpdate() {
    //     // click handler passes to unparse

    // }

    // outputData(props) {
    //     console.log(results)
    // }

    render() {
        // newdata = this.state.index
        // NOTE: THIS IS THE EXPORT FUNCTION
        // when ui updates set new data object to state
        // this.setState({data}) 
        // console.log("from render " +  this.export)

        // console.log(this.state.data) // re-renders but needs new index

        // pass data object to Papa.unparse()

        // let willExport = this.state.data
        // console.log("will export " + willExport)


        // END  

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
                    {/* <NavbarBrand href="/">GO App - grid order tool</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} /> */}
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <div className="note" > NOTE: The export function is under construction </div>
                            <Button onClick={this.handleCSV} color="secondary" size="sm">Export CSV</Button>
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

// function saveToLS(key, value) {
//     if (global.localStorage) {
//       global.localStorage.setItem(
//         "rgl-8",
//         JSON.stringify({
//           [key]: value
//         })
//       );
//     }
//   }


