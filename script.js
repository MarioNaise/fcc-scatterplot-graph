(function() {
  const dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

  const getData = async () => {
    const response = await fetch(dataUrl);
    const dataObj = await response.json();
    return await dataObj;
  }

  const renderData = async () => {
    const dataset = await getData();
    console.log(dataset)
    const w = 1000;
    const h = 700;
    const padding = 100;

    const svg = d3.select("main")
      .append("svg")
      .attr("width", w)
      .attr("height", h)

    const yearsDate = dataset.map((item)=>{
      return new Date(item.Year + "-01-01");
    });
    
    const timeData = dataset.map((item)=>{
      let timeArr = item.Time.split(":");
      return parseInt(timeArr[0]) + parseFloat((1 / 60 ) * timeArr[1]);
    });

    console.log(d3.max(timeData))

    const xScale = d3.scaleTime()
      .domain([d3.min(yearsDate), d3.max(yearsDate)])
      .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
      .domain([d3.max(timeData), d3.min(timeData)])
      .range([h - padding,padding]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis)
       .attr("id", "x-axis");

    svg.append("g")
       .attr("transform", "translate(" + padding + ",0)")
       .call(yAxis)
       .attr("id", "y-axis");
    
  }


  renderData();
})()