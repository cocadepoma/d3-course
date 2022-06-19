/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

// Y value to find in the data
const YKEY = 'revenue';

const svg = d3.select('#chart-area').append('svg')
  .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append('g')
  .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// X label
g.append('text')
  .attr('class', 'x-axis-label')
  .attr('x', WIDTH / 2)
  .attr('y', HEIGHT + 110)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .attr('style', 'transform: translate(0, -30px); fill: black')
  .text('Month')

// Y label
g.append('text')
  .attr('class', 'y-axis-label')
  .attr('x', - (HEIGHT / 2))
  .attr('y', -60)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)')
  .attr('style', 'fill: black')
  .text('Revenue ($)')

d3.csv('data/revenues.csv').then(data => {
  data.forEach(d => {
    d[YKEY] = Number(d[YKEY]);
    d.profit = Number(d.profit);
  });

  // scaleBand
  const x = d3.scaleBand()
    .domain(data.map(d => d.month))
    .range([0, WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.2);

  // linearScale
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[YKEY])])
    .range([HEIGHT, 0])

  // colors
  const colors = d3.scaleOrdinal()
    .domain(data.map(d => d.month))
    .range(d3.schemeCategory10)

  const xAxisCall = d3.axisBottom(x)
  g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${HEIGHT})`)
    .call(xAxisCall)

  const yAxisCall = d3.axisLeft(y)
  g.append('g')
    .attr('class', 'y-axis')
    .call(yAxisCall)

  // Create rect tags depeding on the data
  const rects = g.selectAll('rect')
    .data(data)

  // Append rectangles to svg width the right attributes
  rects.enter().append('rect')
    .attr('y', d => y(d[YKEY]))
    .attr('x', (d) => x(d.month))
    .attr('width', x.bandwidth)
    .attr('height', d => HEIGHT - y(d[YKEY]))
    .attr('fill', 'grey')
    .attr('fill', d => colors(d.month))
});

