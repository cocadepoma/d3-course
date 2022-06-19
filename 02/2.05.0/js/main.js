/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

const svg = d3.select("#chart-area")
  .append("svg")
  .attr("width", 500)
  .attr("height", 400);

svg.append('circle')
  .attr('cx', 50)
  .attr('cy', 50)
  .attr('r', 30)
  .attr('fill', 'red')
  .attr('stroke', 'black');

svg.append('rect')
  .attr('x', 120)
  .attr('y', 50)
  .attr('width', 20)
  .attr('height', 100)
  .attr('fill', 'blue')
  .attr('stroke', 'black');

svg.append('line')
  .attr('x1', 300)
  .attr('y1', 50)
  .attr('x2', 500)
  .attr('y2', 100)
  .attr('stroke', 'black')
  .attr('stroke-width', 5);

svg.append('ellipse')
  .attr('cx', 50)
  .attr('cy', 150)
  .attr('rx', 20)
  .attr('ry', 50)
  .attr('fill', 'purple')
  .attr('stroke', 'black');

svg.append('text')
  .attr('x', 250)
  .attr('y', 350)
  .text('Hello World')
  .attr('font-size', '50px')
  .attr('fill', 'white')
  .attr('stroke', 'black')
  .attr('stroke-width', '2px');