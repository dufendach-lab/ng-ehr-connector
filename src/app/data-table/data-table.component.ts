import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import * as graph from '../graph-data/graph-data.component'

import { fhirclient }from 'fhirclient/lib/types';
import Bundle = fhirclient.FHIR.Bundle;
import Observation = fhirclient.FHIR.Observation;

interface Data {
  name: string,
  values: [
    {value: string, date: string}
  ],
  unit: string
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() observations: Bundle | null | Observation = null;
  obsList: Observation[] = [];

  data: Data[] = [];

  displayColumns: string[] = [];
  columnsToDisplay: string[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['observations']) {
      this.updateObservationList()
    }
  }

  private updateObservationList() {
    if (this.observations) {
      this.obsList = this.observations.entry;
      this.getData();
    }
  }


  /**
   * Analyzes the data sent, then places into data array
   * @returns
   */
  private getData() {
    if(this.obsList[0]?.resource.category.text !== "Vital Signs") { return; }
    console.log(this.obsList)

    this.obsList.forEach(d => {
      if(d.resource.issue) { return; }
      let datum: Data = {name: '', unit: '', values: [{value: '', date: ''}]}

      if(this.isNameInThere(this.data, d.resource.code.text) === false) {
        if(d.resource.code.text === "Blood Pressure") {
          datum.name = d.resource.code.text
          datum.unit = d.resource.component[0].valueQuantity.unit;
          datum.values[0] = (
            {value: d.resource.component[0].valueQuantity.value + " / " + d.resource.component[1].valueQuantity.value, date: formatDate(d.resource.effectiveDateTime, 'shortDate', 'en-US')}
          )
        } else if(d.resource.code.text === "Temperature") {
          datum.name = d.resource.code.text
          datum.unit = "*F";
          datum.values[0] = {value: (d.resource.valueQuantity.value * (9/5) + 32).toFixed(2).toString(), date: formatDate(d.resource.effectiveDateTime, 'shortDate', 'en-US')}
        } else {
          datum.name = d.resource.code.text
          datum.unit = d.resource.valueQuantity.unit;
          datum.values[0] = (
            {value: d.resource.valueQuantity.value, date: formatDate(d.resource.effectiveDateTime, 'shortDate', 'en-US')}
          )
        }
        if(!this.isInArray(this.displayColumns, datum.values[0].date)) {
          this.displayColumns.push(datum.values[0].date)
        }
        this.data.push(datum)
      } else {
        for(let i = 0; i < this.data.length; i++) {
          if(this.data[i].name === d.resource.code.text) {
            if(d.resource.code.text === "Blood Pressure") {
              datum.values[0] = {value: d.resource.component[0].valueQuantity.value + " / " + d.resource.component[1].valueQuantity.value, date: formatDate(d.resource.effectiveDateTime, 'shortDate', 'en-US')}
            } else if(d.resource.code.text === "Temperature") {
              datum.values[0] = {value: (d.resource.valueQuantity.value * (9/5) + 32).toFixed(2).toString(), date: formatDate(d.resource.effectiveDateTime, 'shortDate', 'en-US')}
            } else {
              datum.values[0] = {value: d.resource.valueQuantity.value, date: formatDate(d.resource.effectiveDateTime, 'shortDate', 'en-US')}
            }
            if(!this.isInArray(this.displayColumns, datum.values[0].date)) {
              this.displayColumns.push(datum.values[0].date)
            }
            this.data[i].values.push(datum.values[0])
          }
        }
      }
    })
    let temp2: string[] = ["name"]
    this.columnsToDisplay = temp2.concat(this.displayColumns.reverse())

    for(let d of this.data) {
      d.values.reverse();
    }

  }

  /**
   * Checks to see if a name is in the array
   * @param arr Array to search through (display columns)
   * @param item Item to search with (date)
   * @returns true / false
   */
   isInArray(arr, item): boolean {
    return (arr.find(val => { return val == item }) || []).length > 0;
  }

  /**
   * Checks to see if a key name is in the array of Data2 objects
   * @param arr Main Data Array
   * @param item name to check
   * @returns true / false
   */
  isNameInThere(arr: Data[], item: string): boolean {
    let ans = false;

    arr.forEach(val => {
      if(val.name == item) { ans = true; }
    })
    return ans;
  }

  openDialog(name: string) {
    let num: number = 99;
    switch (name) {
      case 'Blood Pressure':
        num = 0;
        break;
      case 'Temperature':
        num = 1;
        break;
      case 'Pulse':
        num = 2;
        break;
      case 'Respirations':
        num = 3;
        break;
      case 'SpO2':
        num = 4;
        break;
      case 'Height':
        num = 5;
        break;
      case 'Weight':
        num = 6;
        break;
      case 'Head Cir':
        num = 7;
        break;
      case 'R BMI':
        num = 8;
        break;
      default:
        break;
    }
    this.dialog.open(graph.GraphDataComponent, {
      data: this.data[num],
    });
  }

}
