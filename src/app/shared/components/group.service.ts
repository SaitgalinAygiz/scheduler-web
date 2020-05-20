import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GroupInterface} from '../interfaces/group.interface';
import {environment} from '../../../environments/environment';
import {StudentInterface} from '../interfaces/student.interface';
import {GroupCreateInterface} from '../interfaces/group-create.interface';
import {StudentCreateInterface} from '../interfaces/student-create.interface';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

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

  createGroup(groupInput: GroupCreateInterface): Observable<GroupInterface> {
    const body = {
      name: groupInput.name,
    };

    return this.http.post(`${environment.serverUrl}/group/create`, body)
      .pipe(
        map((data: GroupInterface) => {
          return data;
        }), catchError ( error => {
          return throwError(`Что-то пошло не так, ${error}`);
        })
      );
  }

  async deleteGroup(name: string) {
    await this.http.delete(`${environment.serverUrl}/group/${name}`)
      .toPromise();
  }
}
