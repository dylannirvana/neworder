
## GO App - a product grid order application

Grid Order Application tool allows a company to use its taxonomies to control the order of product display. Rather than manipulating a predetermined numerical grid order, and not requiring the user to deal with thousands of products at once, they can focus on the taxonomy they are already familiar with. And work only with catagories that concern them at the time.

### Philosophy
Agile. Declarative. Decoupled. 
1. Easy draggability
2. Conveniently filter and sort
3. CSV in, CSV out

Looking from the top, it takes a CSV delta, parses to JSON. That will be asserted in the UI, courtesy of _react-grid-layout_ and reordered. The data object will then be parsed back to CSV and sent to a unique column in Magento called _neworder_. Pseudocode: `if (neworder) ? neworder : gridorder`. 

### Dependencies
React
https://reactjs.org/

STRML
https://github.com/STRML/react-grid-layout  

File Saver
https://www.npmjs.com/package/file-saver 

Papa Parse
https://www.papaparse.com/ 

React Strap
http://reactstrap.github.io/

Bootstrap
https://getbootstrap.com/


### GitHub repo for this project
https://github.com/dylannirvana/neworder 

### App running on Heroku
https://neworder.herokuapp.com/ 

### Made with Create React App
https://www.npmjs.com/package/create-react-app 
npx i create-react-app projectName
npm start 


