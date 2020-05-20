import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GroupInterface} from '../interfaces/group.interface';
import {TeacherInterface} from '../interfaces/teacher.interface';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})

export class TeacherService {

  constructor(public http: HttpClient) {
  }

  public teachers: TeacherInterface[] = [];

  allTeachers(): TeacherInterface[] {
    this.http.post(`${environment.serverUrl}/teacher/all`, null)
      .subscribe((data: Array<TeacherInterface>) => {
        this.teachers = [];
        data.forEach((teacher) => {
          if (teacher.picture !== undefined && teacher.picture !== null) {
            this.http.get(`${environment.serverUrl}/teacher/${teacher.picture}`, { responseType: 'blob' })
              .toPromise()
              .then((r: Blob) => {
                  const reader = new FileReader();
                  reader.addEventListener('load', () => {
                    teacher.picture = reader.result;
                  }, false);

                  if (r) {
                    reader.readAsDataURL(r);
                  }

                }
              );
          }
          this.teachers.push(teacher);
        });
      });
    return this.teachers;
  }
}
