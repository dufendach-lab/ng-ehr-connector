import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent implements OnInit {

  actualPtData: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie lacinia metus vitae hendrerit. Sed scelerisque rutrum rutrum. Quisque a condimentum tortor, eu lobortis lacus. Vivamus in maximus augue, non fermentum arcu. Donec vitae ex non libero imperdiet mollis ut ac quam. Etiam ornare et neque iaculis convallis. Vivamus nec mauris vulputate, vulputate nunc sit amet, tincidunt libero. Etiam in ultricies turpis, nec facilisis libero. Proin sed eleifend risus. In at diam posuere, faucibus risus vitae, sollicitudin justo. In blandit augue interdum quam facilisis vehicula.';
  dataReceived: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  search(): void {
    this.dataReceived = true;
  }

}
