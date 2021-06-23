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

    this.obsList.forEach(d => {
      if(d.resource.issue) { return; }
      let datum: Data = {name: '', unit: '', values: [{value: '', date: ''}]}

      if(this.isNameInThere(this.data, d.resource.code.text) === false) {
        if(d.resource.code.text === "Weight") {
          datum.name = d.resource.code.text
          datum.unit = d.resource.valueQuantity.unit;
          datum.values[0] = (
            {value: d.resource.valueQuantity.value, date: formatDate(d.resource.effectiveDateTime, 'shortDate', 'en-US')}
          )
        } else if (d.resource.code.text === "Head Cir"){
            datum.name = d.resource.code.text
            datum.unit = d.resource.valueQuantity.unit;
            datum.values[0] = (
              {value: d.resource.valueQuantity.value, date: formatDate(d.resource.effectiveDateTime, 'shortDate', 'en-US')}
            )
        }
        else if(d.resource.code.text === "Height") {
            datum.name = d.resource.code.text
            datum.unit = "Inches";
            datum.values[0] = {value: (d.resource.valueQuantity.value / 2.54).toFixed(2).toString(), date: formatDate(d.resource.effectiveDateTime, 'shortDate', 'en-US')}
        }
        if(!this.isInArray(this.displayColumns, datum.values[0].date) && (datum.values[0].date !== '')) {
          this.displayColumns.push(datum.values[0].date)
        }
        if((datum.name !== '') && (datum.unit !== '')) {
          this.data.push(datum)
        }
      } else {
        for(let i = 0; i < this.data.length; i++) {
          if(this.data[i].name === d.resource.code.text ) {
            if(d.resource.code.text === "Height") {
              datum.values[0] = {value: (d.resource.valueQuantity.value / 2.54).toFixed(2).toString(), date: formatDate(d.resource.effectiveDateTime, 'shortDate', 'en-US')}
            } else if(d.resource.code.text === "Weight"){
              datum.values[0] = {value: d.resource.valueQuantity.value, date: formatDate(d.resource.effectiveDateTime, 'shortDate', 'en-US')}
            } else if (d.resource.code.text === "Head Cir"){
              datum.values[0] = {value: d.resource.valueQuantity.value, date: formatDate(d.resource.effectiveDateTime, 'shortDate', 'en-US')}
            }
            if(!this.isInArray(this.displayColumns, datum.values[0].date) && (datum.values[0].date !== '')) {
              this.displayColumns.push(datum.values[0].date)
            }
            this.data[i].values.push(datum.values[0])
          }
        }
      }
    })

    let temp2: string[] = ["name"]
    this.columnsToDisplay = temp2.concat(this.displayColumns.sort((a,b) => {
      a = a.split('/').reverse().join('');
      b = b.split('/').reverse().join('');
      return a.localeCompare(b);
    }))


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
      case 'Height':
        num = 0;
        break;
      case 'Weight':
        num = 1;
        break;
      case 'Head Cir':
        num = 2;
        break;
      default:
        break;
    }

    this.dialog.open(graph.GraphDataComponent, {
      data: this.data[num]
    });
  }

}
