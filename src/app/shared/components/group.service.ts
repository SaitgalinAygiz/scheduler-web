import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GroupInterface} from '../interfaces/group.interface';
import {environment} from '../../../environments/environment';
import {StudentInterface} from '../interfaces/student.interface';

@Injectable({providedIn: 'root'})
export class GroupService {
  constructor(public http: HttpClient) {
  }

  public groups: GroupInterface[] = [];

  public allGroups(): GroupInterface[] {
    this.http.post(`${environment.serverUrl}/group/all`, null)
      .subscribe((data: Array<GroupInterface>) => {
        this.groups = [];
        data.forEach((dat) => this.groups.push(dat));
      });
    return this.groups;
  }

}
