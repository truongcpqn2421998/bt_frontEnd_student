import {Component, OnInit} from '@angular/core';
import {Student} from '../../model/student';
import {StudentService} from '../../service/student.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  student: Student;

  constructor(private studentService: StudentService,
              private activeRouter: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(studentId => {
        const id = +studentId.get('id');
        this.studentService.findById(id).subscribe(student => {
            this.student = student;
          }
        );
      }
    );
  }
}

