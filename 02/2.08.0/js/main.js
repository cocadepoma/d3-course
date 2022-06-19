/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json('data/buildings.json').then(data => {
  data.forEach(d => {
    d.height = Number(d.height);
  });

  const svg = d3.select('#chart-area').append('svg')
    .attr('width', 600)
    .attr('height', 600);

  const bars = svg.selectAll('rect')
    .data(data)

  bars.enter()
    .append('rect')
    .attr('x', (value, index) => index * 50)
    .attr('y', 10)
    .attr('width', 40)
    .attr('height', (value, index) => value.height)
    .attr('fill', (value) => {
      if (value.height > 275) {
        return 'red';
      } else if (value.height > 260) {
        return 'orange';
      } else if (value.height > 254) {
        return 'yellow';
      } else if (value.height > 250) {
        return 'green';
      } else {
        return 'darkblue';
      }
    })
    .append('text')
    .attr('x', (value, index) => index * 50)
    .attr('y', 10)
    .attr('fill', 'red')
    .attr('font-size', '30px')
    .text(value => value.name)

});