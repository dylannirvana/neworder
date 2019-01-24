
## GO App - a product grid order application

Grid Order Application tool allows a company to use its taxonomies to control the order of product display. Rather than manipulating a predetermined numerical grid order, and not requiring the user to deal with thousands of products at once, they can focus on the taxonomy they are already familiar with. And work only with catagories that concern them at the time.

### Philosophy
Agile. Declarative. Decoupled. 
1. Easy draggability
2. Conveniently filter and sort
3. CSV in, CSV out

Looking from the top, it takes a CSV delta, parses to JSON. That will be asserted in the UI, courtesy of _react-grid-layout_ and reordered. The data object will then be parsed back to CSV and sent to a unique column in Magento called _neworder_. Pseudocode: `if (neworder) ? neworder : gridorder`. 

### TODO: 

Using STRML react-grid-layout (like Desandro's Packery but for React) I am having trouble getting the grid to form. In React Developer Tools, the parent has a prop called _layout_. The data object is in state. react-grid-layout is populating w,h,w,y values by advancing only _y_, hence all the items are vertically sorted and not forming a grid. 

His code is in BasicLayout.js. Mine in App.js

#### Methodology
In index.js put in App.js to see the data run. (You will have to upload a CSV). Replace that with BasicLayout.js to see the Basic Layout. Be sure to take note of "layout" in props (React Dev Tools).

CSS Grid or other interventions do not override this. Simple answer. Don't yet know what it is.

### STRML Packery-like for React
https://github.com/STRML/react-grid-layout  
There are a number of similars available 

### The issue on Stack Overflow 
https://stackoverflow.com/questions/54348311/how-to-pass-array-object-into-react-grid-layout-items-show-up-vertically-and-do 

### GitHub repo for this project
https://github.com/dylannirvana/neworder 

### App running on Heroku
https://neworder.herokuapp.com/ 

### Made with Create React App
https://www.npmjs.com/package/create-react-app 
npx i create-react-app projectName
npm start 


