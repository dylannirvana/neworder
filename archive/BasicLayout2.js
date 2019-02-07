import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import './App.css'


const ReactGridLayout = WidthProvider(RGL);

class BasicLayout2 extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 5,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12
  };

  constructor(props) {
    super(props);
    const layout = this.generateLayout();
    this.state = { 
        layout, 
    };
  }

  generateGridData() {
      return (
        test
      )
  }

  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
        // const myGridData =  ["2"," 3", "4", "5"]

        return (
        <div key={i} className="test" >
        {/* bring in data */}
          {/* <span className="text">{i}</span> */}
          {/* {this.renderData} */}

          {/* {this.state.myData.map( function(data) { 
                return data
            }
              )} */}
{/* this */}
        {/* {...this.state.myData} */}

        

        <li something={this.generateGridData()}></li>

        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    console.log(p)
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
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}

export default BasicLayout2