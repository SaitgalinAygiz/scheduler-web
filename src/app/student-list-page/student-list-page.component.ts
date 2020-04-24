import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

export interface Student {
  position: number;
  name: string;
  group: string;
  course: number;
}


const ELEMENT_DATA: Student[] = [
  {position: 1, name: 'Саитгалин Айгиз', group: 'ПКС-41', course: 4},
  {position: 1, name: 'Саитгалин Айгиз', group: 'ПКС-41', course: 4},
  {position: 1, name: 'Саитгалин Айгиз', group: 'ПКС-41', course: 4},
  {position: 1, name: 'Саитгалин Айгиз', group: 'ПКС-41', course: 4},
  {position: 1, name: 'Саитгалин Айгиз', group: 'ПКС-41', course: 4},
  {position: 1, name: 'Саитгалин Айгиз', group: 'ПКС-41', course: 4},
  {position: 1, name: 'Саитгалин Айгиз', group: 'ПКС-41', course: 4},

];

@Component({
  selector: 'app-student-list-page',
  templateUrl: './student-list-page.component.html',
  styleUrls: ['./student-list-page.component.css']
})
export class StudentListPageComponent implements OnInit {


  displayedColumns: string[] = ['position', 'name', 'group', 'course'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

}
