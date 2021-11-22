import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
export interface Table {
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  id: string

}


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.scss']
})
export class PatientsTableComponent implements AfterViewInit  {

  displayedColumns: string[] = [ 'name', 'phone', 'role', 'edit'];
  dataSource: MatTableDataSource<Table> | undefined

  @ViewChild(MatPaginator)
  paginator!: MatPaginator ;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  patients : Table[] =[]
  constructor( private afs : AngularFirestore , private router: Router,) {
    // // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // const mySubject = new Subject<string>()

    // mySubject.next('Zeroith value')

    // mySubject.subscribe(val => console.log(val))

    // console.log('after subscription')
    // mySubject.next('First Value')

    // console.log('after first value')
    // mySubject.next('Second Value')

    afs.collection<Table>('patients').valueChanges({ idField: 'id' })
    .subscribe(pts => {
      this.patients = pts
      this.dataSource = new MatTableDataSource(this.patients);
    }) 
    
    // Assign the data to the data source for the table to render
    

    
  }

  ngAfterViewInit() {
    if(this.dataSource){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource){
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  }
/** takes the user id and redirect to the user editor */
  edit(id: string){
    this.router.navigate([`./admin/patient/${id}`])
  }
}



// /** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };


// }
