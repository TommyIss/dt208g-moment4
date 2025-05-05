import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  // Properties
  url: string = 'https://webbutveckling.miun.se/files/ramschema.json';
  constructor(private http: HttpClient) { }

  // Metoder
  // Hämta kurser från url
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }
}
