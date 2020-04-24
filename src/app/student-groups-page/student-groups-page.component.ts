import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  course: number;
  studentsCount: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'ПКС-21', course: 2, studentsCount: '33'},
  {position: 2, name: 'ПКС-41', course: 4, studentsCount: '22'},
  {position: 3, name: 'КСК-20', course: 2, studentsCount: '32'},
  {position: 4, name: 'КСК-24', course: 2, studentsCount: '44'},
  {position: 5, name: 'МКК-14', course: 1, studentsCount: '41'},
  {position: 6, name: 'ПБ-14', course: 1, studentsCount: '10'},
  {position: 7, name: 'ПБ-20', course: 2, studentsCount: '23'}
  ];

@Component({
  selector: 'app-student-groups-page',
  templateUrl: './student-groups-page.component.html',
  styleUrls: ['./student-groups-page.component.css']
})

export class StudentGroupsPageComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'course', 'studentsCount'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

}
