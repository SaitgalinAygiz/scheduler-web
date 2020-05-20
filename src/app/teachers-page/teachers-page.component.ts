import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {GroupTable} from '../student-groups-page/student-groups-page.component';
import {TeacherService} from '../shared/components/teacher.service';
import {TeacherInterface} from '../shared/interfaces/teacher.interface';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

export interface TeachersTable {
  name: string;
  picture: SafeResourceUrl;
  position: number;
  _id: string;
}

@Component({
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.css']
})
export class TeachersPageComponent implements OnInit {

  constructor(public teacherService: TeacherService,
              private sanitizer: DomSanitizer ) { }
  displayedColumns: string[] = ['position', 'name', 'picture'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  ngOnInit(): void {

    this.dataSource = this.teachersFromServer();
    this.dataSource.sort = this.sort;
  }

  private teachersFromServer() {
    const groups = this.teacherService.allTeachers();

    const groupData: TeachersTable[] = [
    ];
    let counter = 0;
    groups.forEach((teacher: TeacherInterface) => {

      const groupTableElement: TeachersTable = {
        name: teacher.name,
        position: ++counter,
        picture: this.sanitizer.bypassSecurityTrustResourceUrl(teacher.picture as string),
        _id: teacher._id
      };
      groupData.push(groupTableElement);
    });

    return new MatTableDataSource(groupData);
  }


}
