import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import './App.css'
import Papa from 'papaparse'

const ReactGridLayout = WidthProvider(RGL);

class BasicLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: [],
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12
  };

  constructor(props) {
    super(props);
    const layout = this.generateLayout();
    this.state = { 
      layout,
      data: [] 
    };
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
     ? // CHILD
     this.state.data.map((item) => (  
        <div className="react-grid-item grid-item" key={item.sku}  >                
            <img src={item.image}  alt="product"   />
        </div>  
        )) 
     : null                
} // END 



  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i}>
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <div>
        <form >
          <input type="file" onChange={this.handleChange} />
        </form>  
        <ReactGridLayout
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          {...this.props}
        >
          {/* {this.generateDOM()} */}
          {this.renderData()}
        </ReactGridLayout>
      </div>
    );
  }
}

export default BasicLayout