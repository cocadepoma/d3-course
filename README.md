# udemy-d3

A collection of files for "Mastering data visualization in D3.js"

### 3 Scales

#### 3.1 Linear scales

|  Domain  |      Linear Scale       |  Range   |
| :------: | :---------------------: | :------: |
| Max: 828 | Input: 414, Output: 200 | Max: 400 |
|  Min: 0  | Input: 828, Output: 400 |  Min: 0  |

---

```js
const y = d3.scaleLinear()
  .domain([0, 828])
  .range([0, 400]);

console.log(y(100)) // 48.3
console.log(y(414)) // 200
console.log(y(700)) // 338.2

console.log(y.invert(48.3)) // 100
console.log(y.invert(200)) // 414
console.log(y.invert(338.2)) // 700
```

#### 3.2 Logarithmic Scales

|    Domain    | Logarithmic Scale - Base: 10 |  Range   |
| :----------: | :--------------------------: | :------: |
| Max: 150,000 |   Input: 500, Output: 32.0   | Max: 400 |
|              |  Input: 5000, Output: 181.1  |          |
|   Min: 300   | Input: 50000, Output: 329.3  |  Min: 0  |

|    Domain    | Logarithmic Scale - Base: 2 |  Range   |
| :----------: | :-------------------------: | :------: |
| Max: 150,000 |  Input: 500, Output: 32.9   | Max: 400 |
|              |  Input: 1000, Output: 77.5  |          |
|   Min: 300   | Input: 2000, Output: 122.1  |  Min: 0  |

```js
const x = d3.scaleLog()
  .domain([0, 828])
  .range([0, 400])
  .base(10);

console.log(x(500)) // 32.9
console.log(x(5000)) // 181.1
console.log(x(50000)) // 329.3

console.log(x.invert(32.9)) // 100
console.log(x.invert(181.1)) // 414
console.log(x.invert(329.3)) // 50000
```

#### 3.3 Time Scales

|         Domain          |        Time Scale         |  Range   |
| :---------------------: | :-----------------------: | :------: |
| Max: new Date(2001,0,0) |                           | Max: 400 |
|                         | Input: new Date(2000,6,0) |          |
| Min: new Date(2000,0,0) |                           |  Min: 0  |


```js
const x = d3.scaleLog()
  .domain([
    new Date(2000,0,0),
    new Date(2001,0,0)
  ])
  .range([0, 400])

console.log(x(new Date(2000, 7, 1))) // 199
console.log(x(new Date(2000, 2, 1))) // 66.5
console.log(x(new Date(2000, 10, 25))) // 360

console.log(x.invert(199)) // Tue Aug 01 2000
console.log(x.invert(66.5)) // Wed Mar 01 2000
console.log(x.invert(360)) // Sun Nov 25 2000
```

#### 3.4 Ordinal Scales

|        Domain        |            Time Scale            |       Range       |
| :------------------: | :------------------------------: | :---------------: |
| ["AFRICA", "EUROPE", |                                  | ["RED", "ORANGE", |
| "ASIA", "N.AMERICA"] |   Input: Africa - Output: Red    | "BLUE", "GREEN",  |
|                      |  Input: Europe - Output: Orange  |      "PINK"]      |
|                      |    Input: Asia - Output: Blue    |                   |
|                      | Input: N.America - Output: Green |                   |
|                      | Input: Antarctica - Output: Pink |                   |
|                      | Input: Australasia - Output: Red |                   |

```js
d3.schemeCategory10
d3.schemeCategory20
d3.schemeCategory20b
d3.schemeCategory20c
```

- Custom Range

```js
const color = d3.scaleOrdinal()
  .domain([
    "AFRICA", "EUROPE", "ASIA", "N.AMERICA"
  ])
  .range([
    "RED", "ORANGE", "BLUE", "GREEN", "PINK"
  ])

console.log(color("AFRICA")) // RED
console.log(color("ASIA")) // BLUE
console.log(color("ANTARCTICA")) // PINK
console.log(color("AUSTRALASIA")) // RED
```

- D3 Range
```js
const color = d3.scaleOrdinal()
  .domain([
    "AFRICA", "EUROPE", "ASIA", "N.AMERICA"
  ])
  .range(d3.schemeCategory10)

console.log(color("AFRICA")) // #1f77b4
console.log(color("ASIA")) // #9467bd
console.log(color("ANTARCTICA")) // #e377c2
console.log(color("AUSTRALASIA")) // #7f7f7f
```

#### 3.5 Band Scales

|        Domain        |              Time Scale               |  Range   |
| :------------------: | :-----------------------------------: | :------: |
| ["AFRICA", "EUROPE", |                                       | Max: 400 |
| "ASIA", "N.AMERICA"] |     Input: Africa - Output: 13.1      |          |
|                      |     Input: Europe - Output: 60.2      |          |
|                      | Input: Antarctica - Output: undefined |          |
|                      |                                       |  Min: 0  |

```js
const x = d3.scaleBand()
  .domain([
    "AFRICA", "EUROPE", "ASIA", "N.AMERICA"
  ])
  .paddingInner(0.3)
  .paddingOuter(0.2)

console.log(x("AFRICA")) // 13.1
console.log(x("ASIA")) // 270.5
console.log(x("ANTARCTICA")) // undefined

console.log(x.bandwidth()) // 45.9
```