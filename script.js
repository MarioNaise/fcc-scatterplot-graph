(function() {
  const dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

  const getData = async () => {
    const response = await fetch(dataUrl);
    const dataObj = await response.json();
    return await dataObj;
  }

  const renderData = async () => {
    
    const dataset = await getData();
    const w = 1000;
    const h = 700;
    const padding = 100;
    const yearsDate = dataset.map((item)=>{
      return new Date(item.Year.toString());
    });
    
    const timeData = dataset.map((item)=>{      
      const timeArr = item.Time.split(":");
      const time = new Date(1970, 0, 1, 0, timeArr[0],   timeArr[1]);
      return time;
    });

    const svg = d3.select("main")
      .append("svg")
      .attr("width", w)
      .attr("height", h)

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("id", "tooltip")

    const legend = d3
      .select("main")
      .append("div")
      .attr("id", "legend")
      .selectAll("p")
      .data(["No doping allegations 🔵","Riders with doping allegations 🟠"])
      .enter()
      .append("p")
      .text((d)=>d)


    const xScale = d3.scaleTime()
      .domain([d3.min(yearsDate), d3.max(yearsDate)])
      .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
      .domain([d3.max(timeData), d3.min(timeData)])
      .range([h - padding,padding]);

    const timeFormat = d3.timeFormat('%M:%S');
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale)
      .tickFormat(timeFormat);
    
    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis)
       .attr("id", "x-axis");

    svg.append("g")
       .attr("transform", "translate(" + padding + ",0)")
       .call(yAxis)
       .attr("id", "y-axis");

    svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => {
        return xScale(yearsDate[i]);
      })
      .attr("cy", (d, i) => yScale(timeData[i]))
      .attr("r", 10)
      .attr("class", "dot")
      .attr("data-xvalue", (d, i)=> yearsDate[i])
      .attr("data-yvalue", (d, i)=>timeData[i])
      .attr("fill",(d)=> d.Doping !== "" ? "blue" : "orange")
      .style("opacity", "0.5")
      .attr("stroke", "black")
      .on("mouseover", (e, d)=>{
        const year = new Date(d.Year.toString());
        const time = d.Time;
        tooltip
        .attr("data-year", year)
        .attr("data-gdp", d[1])
        .style("display", "block")
        .style("left", `${e.pageX + 10}px`)
        .style("top", `${e.pageY + 10}px`)
        .html(
          `
            <p>Time: ${time} </p>
            <p>Year: ${year.toLocaleDateString()} </p>
          `
        )
        
      })
      .on("mouseout", (e, d)=>{
          tooltip.style("display", "none")
          })
    
  }
  


  renderData();
})()