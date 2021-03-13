const svgHeight = 500
const svgWidth = 1000

const margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  }

const chartHeight = svgHeight - margin.top - margin.bottom
const chartWidth = svgWidth - margin.left - margin.right

const svg = d3.select("#scatter").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)
  
const chartG = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

d3.csv("data.csv").then(data => { 
    console.log(data)

    const y = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => d.smokes))])
        .range([chartHeight, 0])

    const x = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => d.age))])
        .range([0, chartWidth])

    const yAxis = d3.axisLeft(y)
    const xAxis = d3.axisBottom(x)

    chartG.append("g")
        .call(yAxis)
    
    chartG.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)
    
        const labelArea = svg
        .append("g")
        .attr(
          "transform",
          `translate(${svgWidth / 2}, ${svgHeight - margin.bottom + 30})`
        );
    
    labelArea.append("text").attr("stroke", "#000000").text("Age");

    chartG.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.age))
            .attr("cy", d => y(d.smokes))
            .attr("r", 10)
})

