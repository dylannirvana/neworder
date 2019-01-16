import React, { Component } from 'react'
// import Packery from 'react-packery-component'
// import Draggabilly from 'draggabilly'

import GridLayout from 'react-grid-layout'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'



class Gallery extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key="a">a</div>
        <div key="b">b</div>
        <div key="c">c</div>
      </GridLayout>
    )
  }
}












// let packeryOptions = {
//     transitionDuration: 0
// }

// const elements = [
//     {
//         name: "Jim"
//     },
//     {
//         name: "John"
//     },
//     {
//         Name: "Jack"
//     }
// ]



// external js: packery.pkgd.js, draggabilly.pkgd.js

// const Gallery = () => {
//     var pckry = new Packery( '.grid', {
//         itemSelector: '.grid-item',
//         columnWidth: 100
//       });
      
//       pckry.getItemElements().forEach( function( itemElem ) {
//         var draggie = new Draggabilly( itemElem );
//         pckry.bindDraggabillyEvents( draggie );
//       });
// }


  


// class Gallery extends Component {
//     render() {
//         let childElements = this.props.elements.map(function(element) {
//             return (
//                 <li className="image-element-class">
//                     <p>  </p>={element.src}
//                 </li>
//             )
//         })

//         return (
//             <Packery 
//             className={'my-gallery-class'}
//             elementType={'ul'}
//             options={packeryOptions}
//             disableImagesLoaded={false}
//             >
//                 {childElements}
//             </Packery>
//         )
//     }
// }

export default Gallery