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
  }

  renderData();
})()