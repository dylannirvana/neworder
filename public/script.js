// INITIALIZE PACKERY
var $grid = $('.grid').packery({
    itemSelector: '.grid-item',
    // gutter: 10,
    // columnWidth helps with drop positioning
    columnWidth: 240
  });
  
  // // INITIALIZE ISOTOPE
  // var $grid = $('.grid').isotope({
  // $grid.isotope({
  //   getSortData: {
  //     name: '.name', // text from querySelector
  //     category2: '.category2',
  //     function2: '.function2',
  //     family: '.family'
  //     // category: '[data-category]' // value of attribute
  //   }
  // });
  
  
  
  
  // DRAGGABILLY
  $grid.find('.grid-item').each( function( i, gridItem ) {
    var draggie = new Draggabilly( gridItem );
    // bind drag events to Packery
    $grid.packery( 'bindDraggabillyEvents', draggie );
  });