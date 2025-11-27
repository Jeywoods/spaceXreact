import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import Geo from "../geo.json";

export function Map({ launchpads = [], highlightedPad = null }) {
  const containerRef = useRef(null);
  const width = 1000;
  const height = 600;

  // Рисуем карту один раз
  //очистка блока
  useEffect(() => {
    const root = d3.select(containerRef.current);
    root.selectAll("*").remove();
    //создаем svg
    const svg = root
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("display", "block");

      //кидаем слои с точками и мапой
    const rootG = svg.append("g").attr("class", "rootG");
    rootG.append("g").attr("class", "gMap");
    rootG.append("g").attr("class", "gPads");

    const projection = d3.geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);
    const gMap = rootG.select(".gMap");

    //Карта
    gMap.selectAll("path")
      .data(Geo.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#9cc")
      .attr("stroke", "#333");

    const zoom = d3.zoom().scaleExtent([1, 8])
      .on("zoom", (event) => rootG.attr("transform", event.transform));

    svg.call(zoom);
  }, []);

  useEffect(() => {
    const svg = d3.select(containerRef.current).select("svg");

    const projection = d3.geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.5]);

    const gPads = svg.select(".gPads");

    console.log("Launchpads total:", launchpads.length);
    //связь элементов списка и точками
    const circles = gPads
      .selectAll("circle")
      .data(launchpads, d => d.id);

    const enter = circles.enter()
      .append("circle")
      .attr("r", 6);

    enter.append("title").text(d => d.name);

    const merged = enter.merge(circles);

    // рисуем точки 
    merged
      .attr("cx", d => projection([d.longitude, d.latitude])[0])
      .attr("cy", d => projection([d.longitude, d.latitude])[1])
      .attr("fill", d => d.id === highlightedPad ? "red" : "yellow")
      .attr("r", d => (d.id === highlightedPad ? 15 : 6)); // шире при наведении
  }, [launchpads, highlightedPad]);

  return <div ref={containerRef} />;
}
