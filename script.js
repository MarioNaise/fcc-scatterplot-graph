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
    const padding = 50;

    const svg = d3.select("main")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
  
    console.log()

    const yearsDate = dataset.map((item)=>{
      return new Date(item.Year+"-01-01");
    });
    console.log([d3.min(yearsDate), d3.max(yearsDate)])

    const xScale = d3.scaleTime()
      .domain([d3.min(yearsDate), d3.max(yearsDate)])
      .range([padding, w - padding]);

    const xAxis = d3.axisBottom(xScale);
    
    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis)
       .attr("id", "x-axis");
    
  }


  renderData();
})()