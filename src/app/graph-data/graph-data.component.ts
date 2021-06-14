import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as d3 from "d3";

interface DialogData {
  value: string,
  date: Date
}

interface IncData {
  name: string,
  values: [
    {value: string, date: string}
  ],
  unit: string
}

@Component({
  selector: 'app-graph-data',
  templateUrl: './graph-data.component.html',
  styleUrls: ['./graph-data.component.scss']
})
export class GraphDataComponent implements OnInit {
  userData: DialogData[] = [];

  private svg;
  private margin = 60;
  private width = 400 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private xScale;
  private yScale;
  private lineGroup;

  constructor(public dialogRef: MatDialogRef<GraphDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IncData) { this.getData(); }

  ngOnInit(): void {
    this.createSvg();
    this.drawPlot();
  }


  private getData() {
    this.data.values.forEach(element => {
      let temp: DialogData = {value: element.value, date: new Date(element.date)}
      this.userData.push(temp)
    })
  }

  private createSvg(): void {
    this.svg = d3.select("#scatter-plot")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

      let iter: Date[] = [];
      this.userData.forEach(d => {
        iter.push(d.date);
      });
      let sort = iter.sort((a,b)=> +a - +b)
      // Add X axis
      this.xScale = d3.scaleTime()
        .domain([sort[0], sort[sort.length - 1]])
        .range([ 0, this.width ]).nice();

        // Add Y axis
      this.yScale = d3.scaleLinear()
      .domain([0, 150])
      .range([ this.height, 0]);

      // Add Line
      this.lineGroup = d3.line()
                        .x( (d: any) => this.xScale(d.date))
                        .y( (d: any) => this.yScale(d.value));

  }

  private drawPlot(): void {

    // this.svg.append("text")
    //   .attr("x", (this.width / 2))
    //   .attr("y", 0 - (this.margin / 2))
    //   .attr("text-anchor", "middle")
    //   .style("font-size", "16px")
    //   .style("text-decoration", "underline")
    //   .text("Weight vs Time Graph");

    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.xScale).ticks(d3.timeMonth.every(3)))
      .selectAll("text")
      .attr("transform", "translate(-10,10)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", 12)
      .style("fill", "black");

    this.svg.append("text")
      .attr("transform",
            "translate(" + (this.width/2) + " ," +
                           (this.height + this.margin) + ")")
      .style("text-anchor", "middle")
      .text("Date");

    this.svg.append("g")
      .call(d3.axisLeft(this.yScale));

    this.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - this.margin)
      .attr("x",0 - (this.height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(this.data.name + ` (${this.data.unit})`);

    this.svg.append('path')
      .datum(this.userData)
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
      .data(this.userData)
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
        d3.select(e.currentTarget).transition()
          .duration(400)
          .attr("r", 5)
          .style("fill", "#ffffff");
          tooltip.style('visibility', 'hidden')
      })
      .on('mousemove', (e,d) => {
        let date = formatDate(d.date, "shortDate", "en-US")
        tooltip.style('top', (e.pageY-70)+"px").style('left', (e.pageX-60)+"px")
                    .html(`${this.data.name}: ${d.value} ${this.data.unit}</br>Date:  ${date}`);
      });

  }

}


//   newVitalName: string[] = [];
//   newVitalDate: number[] = [];
//   vitalVal: string[] = [];
//   vitalUnit: string[] = [];

// Filters out same vital signs by picking one with most recent date
  //  getRecentVitals() {
  //   if(this.obsList[0]?.resource.category.text !== "Vital Signs") { return; }

  //   this.obsList.forEach(data => {
  //     if(data.resource.issue) { return; }
  //     if(!this.newVitalName.includes(data.resource.code.text)) {
  //       this.newVitalName.push(data.resource.code.text);
  //       this.newVitalDate.push(data.resource.effectiveDateTime);
  //     }
  //     else {
  //       for(let i = 0; i < this.newVitalName.length; i++) {
  //         if(this.newVitalName[i] == data.resource.code.text) {
  //           if(data.resource.effectiveDateTime > this.newVitalDate[i]) {
  //             this.newVitalDate[i] = data.resource.effectiveDateTime;
  //           }
  //         }
  //       }
  //     }
  //   });
  //   console.warn(this.newVitalDate);
  //   console.warn(this.newVitalName);
  // }
