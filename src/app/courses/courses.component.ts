import { Component } from '@angular/core';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  // Properties
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchPhrase: string = '';
  codeOrder: string = 'desc';
  nameOrder: string = 'desc';
  codeArrow: string = 'fas fa-caret-up';
  nameArrow: string = 'fas fa-caret-up';
  
  constructor(private coursesService: CoursesService) {}

  // Metoder
  ngOnInit() {
    this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = courses;
    })
  }

  // Hitta kurs via namn eller kod
  findCourse():void {
    this.filteredCourses = this.courses.filter((course) =>
      course.code.toLowerCase().includes(this.searchPhrase.toLowerCase()) ||
      course.coursename.toLowerCase().includes(this.searchPhrase.toLowerCase())
    );
  }
  
  // Sortera via namn
  sortByName(): void {
    if(this.nameOrder === 'desc') {
      this.nameOrder = 'asc';
      this.nameArrow = 'fas fa-caret-down';
      this.filteredCourses.sort((a, b) => 
        (a.coursename > b.coursename) ? 1 : -1
      );
    } else if(this.nameOrder === 'asc') {
      this.nameOrder = 'desc';
      this.nameArrow = 'fas fa-caret-up';
      this.filteredCourses.sort((a, b) => 
      (b.coursename > a.coursename) ? 1 : -1
      );
    }
  }

  // Sortera via kod
  sortByCode(): void {
    if(this.codeOrder === 'desc') {
      this.codeOrder = 'asc';
      this.codeArrow = 'fas fa-caret-down';
      this.filteredCourses.sort((a, b) => 
      (a.code > b.code) ? 1 : -1
      );
    } else if(this.codeOrder === 'asc') {
      this.codeOrder = 'desc';
      this.codeArrow = 'fas fa-caret-up';
      this.filteredCourses.sort((a, b) => 
      (b.code > a.code) ? 1 : -1
      );
    }
  }
}
