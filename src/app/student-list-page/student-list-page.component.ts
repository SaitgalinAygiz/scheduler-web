import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {StudentService} from '../shared/components/student.service';
import {StudentInterface} from '../shared/interfaces/student.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../shared/components/group.service';
import {GroupSelectInterface} from './group-select-interface';
import {StudentCreateInterface} from '../shared/interfaces/student-create.interface';

@Component({
  selector: 'app-student-list-page',
  templateUrl: './student-list-page.component.html',
  styleUrls: ['./student-list-page.component.css']
})
export class StudentListPageComponent implements OnInit {

  constructor(
    public studentService: StudentService,
    public groupService: GroupService
  ) {
  }
  displayedColumns: string[] = ['name', 'group', 'phoneNumber', 'deleteButtons'];
  groupSelect: GroupSelectInterface[] = [];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  form: FormGroup;
  submitted = false;
  dataSource: MatTableDataSource<any> = this.studentsFromServer();

  studentsFromServer() {
    const STUDENT_DATA: StudentInterface[] = [
    ];
    const students = this.studentService.allStudents();
    students.forEach((student) => STUDENT_DATA.push(student));
    return new MatTableDataSource(STUDENT_DATA);
  }

  async createStudent() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const studentInput: StudentCreateInterface = {
      name: this.form.value.name,
      group: this.form.value.group.name,
      phoneNumber: this.form.value.phoneNumber
    };

    const student = await this.studentService
      .createStudent(studentInput)
      .toPromise();

    if (student === null) {
      this.submitted = false;
      return;
    } else {
      this.dataSource.data.push(student);
      this.dataSource._updateChangeSubscription();
      this.submitted = false;
      this.form.value.name = '';
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      group: new FormControl(null, Validators.required)
    });
    this.dataSource = this.studentsFromServer();

    this.groupSelect = this.groupService.allGroups();

    this.dataSource.sort = this.sort;
    this.dataSource._updateChangeSubscription();

  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).then(() => {

        this.dataSource.data = this.dataSource.data.filter(element => element._id !== id);
        this.dataSource._updateChangeSubscription();
    }
    );
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

