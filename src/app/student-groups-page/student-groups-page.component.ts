import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {GroupService} from '../shared/components/group.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupCreateInterface} from '../shared/interfaces/group-create.interface';

export interface GroupTable {
  name: string;
  position: number;
  status: string;
  studentsCount: number;
}


@Component({
  selector: 'app-student-groups-page',
  templateUrl: './student-groups-page.component.html',
  styleUrls: ['./student-groups-page.component.css']
})

export class StudentGroupsPageComponent implements OnInit {

  constructor(public groupService: GroupService) {
  }

  displayedColumns: string[] = ['position', 'name', 'status', 'studentsCount', 'deleteButtons'];

  dataSource: MatTableDataSource<any>;
  form: FormGroup;
  submitted = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.dataSource = this.groupsFromServer();
    this.dataSource.sort = this.sort;
  }

  groupsFromServer() {
    const groups = this.groupService.allGroups();

    const groupData: GroupTable[] = [
    ];
    let counter = 0;
    groups.forEach((group) => {

      const groupTableElement: GroupTable = {
        name: group.name,
        position: ++counter,
        status: group.status,
        studentsCount: group.students.length
      };
      groupData.push(groupTableElement);
    });

    return new MatTableDataSource(groupData);
  }

  async createGroup() {
    if (this.form.invalid) {
      return;
    }

    const groupInput: GroupCreateInterface = {
      name: this.form.value.name,
    };

    this.submitted = true;

    const group = await this.groupService
      .createGroup(groupInput)
      .toPromise();

    if (group === null) {
      this.submitted = false;
      return;
    } else {
      const groupInfoTable: GroupTable = {
        name: group.name,
        position: this.dataSource.data.length + 1,
        status: group.status,
        studentsCount: 0
      };
      this.dataSource.data.push(groupInfoTable);
      this.dataSource._updateChangeSubscription();
      this.submitted = false;
      this.form.value.name = '';
    }
  }


  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteGroup(name: string) {
    this.groupService.deleteGroup(name).then(() => {
        this.dataSource.data = this.dataSource.data
          .filter(element => element.name !== name);
        this.dataSource._updateChangeSubscription();
      }
    );
  }
}
