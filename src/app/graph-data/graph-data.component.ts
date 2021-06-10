import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import * as d3 from "d3";

import { fhirclient }from 'fhirclient/lib/types';
import Bundle = fhirclient.FHIR.Bundle;
import Observation = fhirclient.FHIR.Observation;

interface Weight {
  value: string,
  unit: string,
  date: Date
}

@Component({
  selector: 'app-graph-data',
  templateUrl: './graph-data.component.html',
  styleUrls: ['./graph-data.component.scss']
})
export class GraphDataComponent implements OnInit, OnChanges {

  @Input() observations: Bundle | null | Observation = null;
  obsList: Observation[] = [];

  weightData: Weight[] = [];

  newVitalName: string[] = [];
  newVitalDate: number[] = [];
  vitalVal: string[] = [];
  vitalUnit: string[] = [];

  private svg;
  private margin = 50;
  private width = 400 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private xScale;
  private yScale;
  private lineGroup;

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawPlot();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['observations']) {
      this.updateObservationList();
    }
  }

  private updateObservationList() {
    if (this.observations) {
      this.obsList = this.observations.entry;
      if(this.obsList[0]?.resource.resourceType === "Observation") {
        this.getWeightData();
      }
    }
  }

  // Retrieves all weight data and places in array of Weights for graph
  private getWeightData() {
    if(this.obsList[0]?.resource.category.text !== "Vital Signs") { return; }

    this.obsList.forEach(data => {
      if(data.resource.issue) { return; }
      if(data.resource.code.text === "Weight"){
        let weight: Weight = {value: '', unit: '', date: new Date()};
        weight.value = data.resource.valueQuantity.value;
        weight.unit = data.resource.valueQuantity.unit;
        let newDate: Date = new Date(data.resource.effectiveDateTime);
        weight.date = newDate;
        this.weightData.push(weight);
      }
    });
  }

   // Filters out same vital signs by picking one with most recent date
   getRecentVitals() {
    if(this.obsList[0]?.resource.category.text !== "Vital Signs") { return; }

    this.obsList.forEach(data => {
      // TODO: Figure out issue with the dates;
      if(data.resource.issue) { return; }
      if(!this.newVitalName.includes(data.resource.code.text)) {
        this.newVitalName.push(data.resource.code.text);
        this.newVitalDate.push(data.resource.effectiveDateTime);
      }
      else {
        for(let i = 0; i < this.newVitalName.length; i++) {
          if(this.newVitalName[i] == data.resource.code.text) {
            if(data.resource.effectiveDateTime > this.newVitalDate[i]) {
              this.newVitalDate[i] = data.resource.effectiveDateTime;
            }
          }
        }
      }
    });
    console.warn(this.newVitalDate);
    console.warn(this.newVitalName);
  }

  private createSvg(): void {
    this.svg = d3.select("#scatter-plot")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

      let iter: Date[] = [];
      this.weightData.forEach(d => {
        iter.push(d.date);
      });
      let sort = iter.sort((a,b)=> +a - +b)
      console.log(sort)
      // Add X axis
      this.xScale = d3.scaleTime()
        .domain([sort[0], sort[sort.length - 1]])
        .range([ 0, this.width ]).nice();

        // Add Y axis
      this.yScale = d3.scaleLinear()
      .domain([70, 100])
      .range([ this.height, 0]);

      // Add Line
      this.lineGroup = d3.line()
                        .x( (d: any) => this.xScale(d.date))
                        .y( (d: any) => this.yScale(d.value));

  }

  private drawPlot(): void {

    this.svg.append("text")
      .attr("x", (this.width / 2))
      .attr("y", 0 - (this.margin / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Weight vs Time Graph");

    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.xScale).ticks(d3.timeMonth.every(3)))
      .selectAll("text")
      .attr("transform", "translate(-10,10)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", 12)
      .style("fill", "black");

    this.svg.append("g")
      .call(d3.axisLeft(this.yScale));

    this.svg.append('path')
      .datum(this.weightData)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', '#ca5699')
      .attr('d', this.lineGroup)

    // Tooltip
    const tooltip = d3.select("#scatter-plot")
    .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background-color", "#ffffff")
    .style("padding", "7px")
    .style("font-color", "white")
    .style("border-style", "solid")
    .style("border-radius", "5px")
    .style("border-width", "1.5px")
    .style("border-color", "#ca5699")

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll("dot")
      .data(this.weightData)
      .enter()
      .append("circle")
      .attr("id", "dotsTooltip")
      .attr("cx", d => this.xScale(d.date))
      .attr("cy", d => this.yScale(d.value))
      .attr("r", 5)
      .attr("stroke", "#ca5699")
      .attr("stroke-width", 1.5)
      .style("fill", "#ffffff")

      .on('mouseover', (e, d) => {

        d3.select(e.currentTarget).transition()
          .duration(100)
          .attr("r", 7)
          .style("fill", "#ca5699");
          tooltip.style('visibility', 'visible');
      })
      .on('mouseout', (e, d) => {
        console.log("leaving")
        d3.select(e.currentTarget).transition()
          .duration(400)
          .attr("r", 5)
          .style("fill", "#ffffff");
          tooltip.style('visibility', 'hidden')
      })
      .on('mousemove', (e,d) => {
        let date = formatDate(d.date, "shortDate", "en-US")
        tooltip.style('top', (e.pageY-80)+"px").style('left', (e.pageX-300)+"px")
                    .html(`Weight: ${d.value} kg</br>Date:  ${date}`);
      });

  }

}

