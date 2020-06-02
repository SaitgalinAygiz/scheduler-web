import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../../environments/environment';
import {StudentInterface} from '../interfaces/student.interface';
import {StudentCreateInterface} from '../interfaces/student-create.interface';
import {catchError, map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class StudentService {

  public students: StudentInterface[] = [];
  public error$: Subject<string> = new Subject<string>();

  constructor(public http: HttpClient, public auth: AuthService) {
  }

  public allStudents(): StudentInterface[]{
    this.getAllStudentsFromServer().then(r => this.students );
    return this.students;
  }

  async getAllStudentsFromServer() {
    await this.http.post(`${environment.serverUrl}/student/all`, null)
      .subscribe((data: Array<StudentInterface>) => {
        this.students = [];
        data.forEach((dat) => this.students.push(dat));
      });
  }


  // TODO: не бейте..
  public createStudent(studentInput: StudentCreateInterface): Observable<StudentInterface> {
    const body = {
      name: studentInput.name,
      group: studentInput.group,
      phoneNumber: studentInput.phoneNumber
    };

    return this.http.post(`${environment.serverUrl}/student/create`, body)
      .pipe(
        map((data: StudentInterface) => {
          return data;
        }), catchError ( error => {
          return throwError(`Что-то пошло не так с запросом, ${error.message}`);
        })
      );
  }

  async deleteStudent(id: string) {
    await this.http.delete(`${environment.serverUrl}/student/${id}`)
      .toPromise();
  }
}
