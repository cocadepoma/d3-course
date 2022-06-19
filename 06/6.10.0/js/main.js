/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 3 - CoinStats
*/

const MARGIN = { LEFT: 20, RIGHT: 100, TOP: 50, BOTTOM: 100 }
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM

const svg = d3.select("#chart-area").append("svg")
	.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
	.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
	.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// time parser for x-scale
const parseTime = d3.timeParse("%d/%m/%Y")
// for tooltip
const bisectDate = d3.bisector(d => d.date).left

// add line to chart
g.append("path")
	.attr("class", "line")
	.attr("fill", "none")
	.attr("stroke", "grey")
	.attr("stroke-width", "3px")

// axis labels
const xLabel = g.append("text")
	.attr("class", "x axisLabel")
	.attr("y", HEIGHT + 50)
	.attr("x", WIDTH / 2)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.text("Time")
const yLabel = g.append("text")
	.attr("class", "y axisLabel")
	.attr("transform", "rotate(-90)")
	.attr("y", -60)
	.attr("x", -170)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.text("Price ($)")

// scales
const x = d3.scaleTime().range([0, WIDTH])
const y = d3.scaleLinear().range([HEIGHT, 0])

// axis generators
const xAxisCall = d3.axisBottom()
const yAxisCall = d3.axisLeft()
	.ticks(6)
	.tickFormat(d => `${parseInt(d / 1000)}k`)

// axis groups
const xAxis = g.append("g")
	.attr("class", "x axis")
	.attr("transform", `translate(0, ${HEIGHT})`)
const yAxis = g.append("g")
	.attr("class", "y axis")

// axis groups
// const xAxis = g.append("g")
// 	.attr("class", "x axis")
// 	.attr("transform", `translate(0, ${HEIGHT})`)
// const yAxis = g.append("g")
// 	.attr("class", "y axis")

// // x-axis label
// xAxis.append("text")
// 	.attr("x", WIDTH / 2)
// 	.attr("font-size", "20px")
// 	.attr("text-anchor", "middle")
// 	.text("Price (USD)")

// // y-axis label
// yAxis.append("text")
// 	.attr("transform", "rotate(-90)")
// 	.attr("y", 0)
// 	.attr("x", -170)
// 	.attr("font-size", "20px")
// 	.attr("text-anchor", "middle")
// 	.text("Life Expectancy (Years)")

const parsedData = {};

d3.json("data/coins.json").then(data => {

	Object.keys(data).forEach(id => {
		parsedData[id] = data[id]
			.filter(d => (d['24h_vol'] && d['market_cap'] && d['price_usd'] && d['date']))
			.map(d => {
				d['24h_vol'] = Number(d['24h_vol']);
				d['market_cap'] = Number(d['market_cap']);
				d['price_usd'] = Number(d['price_usd']);
				d['date'] = parseTime(d['date']);
				return d
			})
	});

	update();
})

function update() {
	const coin = 'bitcoin_cash';
	const price = 'price_usd';
	// set scale domains
	const t = d3.transition().duration(1000)

	x.domain(d3.extent(parsedData[coin], d => d.date))
	y.domain([
		d3.min(parsedData[coin], d => d[price]) / 1.005,
		d3.max(parsedData[coin], d => d[price]) * 1.005
	])

	// generate axes once scales have been set

	// xAxis.transition(t).call(xAxisCall.scale(x))
	// yAxis.transition(t).call(yAxisCall.scale(y))

	// update axes
	xAxisCall.scale(x)
	xAxis.transition(t).call(xAxisCall)
	yAxisCall.scale(y)
	yAxis.transition(t).call(yAxisCall)

	// clear old tooltips
	// d3.select(".focus").remove()
	// d3.select(".overlay").remove()

	/******************************** Tooltip Code ********************************/

	// const focus = g.append("g")
	// 	.attr("class", "focus")
	// 	.style("display", "none")

	// focus.append("line")
	// 	.attr("class", "x-hover-line hover-line")
	// 	.attr("y1", 0)
	// 	.attr("y2", HEIGHT)

	// focus.append("line")
	// 	.attr("class", "y-hover-line hover-line")
	// 	.attr("x1", 0)
	// 	.attr("x2", WIDTH)

	// focus.append("circle")
	// 	.attr("r", 7.5)

	// focus.append("text")
	// 	.attr("x", 15)
	// 	.attr("dy", ".31em")

	// g.append("rect")
	// 	.attr("class", "overlay")
	// 	.attr("width", WIDTH)
	// 	.attr("height", HEIGHT)
	// 	.on("mouseover", () => focus.style("display", null))
	// 	.on("mouseout", () => focus.style("display", "none"))
	// 	.on("mousemove", mousemove)

	// function mousemove() {
	// 	const x0 = x.invert(d3.mouse(this)[0])
	// 	const i = bisectDate(parsedData[coin], x0, 1)
	// 	const d0 = parsedData[coin][i - 1]
	// 	const d1 = parsedData[coin][i]
	// 	const d = x0 - d0.date > d1.date - x0 ? d1 : d0
	// 	focus.attr("transform", `translate(${x(d.date)}, ${y(d[price])})`)
	// 	focus.select("text").text(d[price])
	// 	focus.select(".x-hover-line").attr("y2", HEIGHT - y(d[price]))
	// 	focus.select(".y-hover-line").attr("x2", -x(d.date))
	// }

	/******************************** Tooltip Code ********************************/

	// line path generator
	const line = d3.line()
		.x(d => x(d.date))
		.y(d => y(d[price]))

	// Update our line path
	g.select(".line")
		.transition(t)
		.attr("d", line(parsedData[coin]))

	// Update y-axis label
	const newText = (yValue === "price_usd")
		? "Price ($)"
		: (yValue === "market_cap")
			? "Market Capitalization ($)"
			: "24 Hour Trading Volume ($)"
	yLabel.text(newText)
};
