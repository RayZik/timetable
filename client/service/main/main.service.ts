import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';


/**
 * Main service for app
 */
@Injectable()
export class MainService {
  private _cache: any = {};

  constructor(
    private _http: Http
  ) { }


  private headers(): RequestOptions {
    return new RequestOptions(
      {
        headers: new Headers({
          'Content-Type': 'application/json'
        }
        )
      }
    );
  }

  /**
   * Get table cells 
   */
  getCellTimetable(): Observable<any> {
    if (this._cache['cells']) {
      return Observable.of(this._cache['cells']);
    } else {
      return this
        ._http
        .get('/api/main/cellTimetable', this.headers())
        .map((response: Response) => {
          this._cache['cells'] = response.json();
          return this._cache['cells'];
        })
        .share()
    }
  }

  /**
   * Add teacher to the DB
   * @param obj - teacher object
   */
  addTeacher(obj: any): Observable<boolean> {
    return this
      ._http
      .post('/api/main/cellTimetable/add_teacher', obj, this.headers())
      .map((response: Response) => response.status === 200 ? true : false);
  }

  /**
   * Remove teacher from the DB
   * @param obj - teacher object
   */
  deleteTeacher(obj: any): Observable<boolean> {
    return this
      ._http
      .post(`/api/main/cellTimetable/delete_teacher/${obj.id}`, obj, this.headers())
      .map((response: Response) => response.status === 200 ? true : false);
  }

  /**
   * Add teacher to the DB
   * @param obj - teacher object
   */
  addOffice(obj: Object): Observable<boolean> {
    return this
      ._http
      .post('/api/main/cellTimetable/add_office', obj, this.headers())
      .map((response: Response) => response.status === 200 ? true : false);
  }

  /**
   * Remove office from the DB
   * @param obj - teacher object
   */
  deleteOffice(obj: any): Observable<boolean> {
    return this
      ._http
      .post(`/api/main/cellTimetable/delete_office/${obj.id}`, obj, this.headers())
      .map((response: Response) => response.status === 200 ? true : false);
  }

  /**
   * Add group to the DB
   * @param obj - group object
   */
  addGroup(obj: Object): Observable<boolean> {
    return this
      ._http
      .post('/api/main/cellTimetable/add_group', obj, this.headers())
      .map((response: Response) => response.status === 200 ? true : false);
  }

  /**
   * Remove group from the DB
   * @param obj - group object
   */
  deleteGroup(obj: any): Observable<boolean> {
    return this
      ._http
      .post(`/api/main/cellTimetable/delete_group/${obj.id}`, obj, this.headers())
      .map((response: Response) => response.status === 200 ? true : false);
  }

  /**
   * Add subject to the DB
   * @param obj - subject object
   */
  addSubject(obj: Object): Observable<boolean> {
    return this
      ._http
      .post('/api/main/cellTimetable/add_subject', obj, this.headers())
      .map((response: Response) => response.status === 200 ? true : false);
  }

  /**
   * Remove subject from the DB
   * @param obj - subject object
   */
  deleteSubject(obj: any): Observable<boolean> {
    return this
      ._http
      .post(`/api/main/cellTimetable/delete_subject/${obj.id}`, obj, this.headers())
      .map((response: Response) => response.status === 200 ? true : false);
  }

  /**
   * Add cell to the DB
   * @param obj - cell object
   */
  addCell(obj: Object): Observable<boolean> {
    return this
      ._http
      .post('/api/main/cellTimetable/add_cell', obj, this.headers())
      .map((response: Response) => response.status === 200 ? true : false);
  }

  /**
   * Remove cell from the DB
   * @param obj - cell object
   */
  deleteCell(obj: any): Observable<boolean> {
    return this
      ._http
      .post(`/api/main/cellTimetable/delete_cell/${obj.id}`, obj, this.headers())
      .map((response: Response) => response.status === 200 ? true : false);
  }

  /**
   * Add lesson timetable to the DB
   * @param obj - lesson object
   */
  addTimeLesson(obj: Object): Observable<boolean> {
    return this
      ._http
      .post('/api/main/timetable/add_time_lesson', obj, this.headers())
      .map((response: Response) => response.status === 200 ? true : false);
  }

  /**
   * Add date to the DB
   * @param obj - newDate object
   */
  addDate(newDate: Object): Observable<boolean> {
    return this
      ._http
      .post('/api/main/timetable/add_date', newDate, this.headers())
      .map((response: Response) => response.status === 200 ? true : false);
  }

  /**
   *  Get time lesson
   */
  getTimeLesson(): Observable<any> {
    if (this._cache['tLesson']) {
      return Observable.of(this._cache['tLesson']);
    } else {
      return this
        ._http
        .get('/api/main/timetable', this.headers())
        .map((response: Response) => {
          this._cache['tLesson'] = response.json();
          return this._cache['tLesson'];
        })
        .share()
    }
  }

  /**
   * Get one lesson by ID
   * @param id lesson 
   */
  getTimeLessonById(id: string): Observable<any> {
    return this
      ._http
      .get(`/api/main/timetable/${id}`, this.headers())
      .map((response: Response) => {
        this._cache['tLessonBId'] = response.json();
        return this._cache['tLessonBId'];
      })
      .share()
  }

  /**
   * Save timetable cell
   * @param data - cell data
   */
  saveCell(data): Observable<boolean> {
    return this
      ._http
      .put('/api/main/cellTimetable/save_cell', data, this.headers())
      .map((response: Response) => response.status === 200 ? true : false);
  }

  /**
   * Remove lesson from the DB
   * @param lesson - lesson object
   */
  deleteLesson(lesson: Object): Observable<any> {
    return this
      ._http
      .post('/api/main/timetable/delete_time_lesson', { lesson: lesson }, this.headers())
  }

  /**
   * Get holydays
   */
  getHolidays(): Observable<any> {
    if (this._cache['holidays']) {
      return Observable.of(this._cache['holidays']);
    } else {
      return this
        ._http
        .get(`/api/main/timetable/holidays`, this.headers())
        .map((response: Response) => {
          this._cache['holidays'] = response.json();
          return this._cache['holidays'];
        })
        .share()
    }
  }
}
