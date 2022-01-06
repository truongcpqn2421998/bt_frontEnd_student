import {Component, OnInit} from '@angular/core';
import {Student} from '../../model/student';
import {StudentService} from '../../service/student.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
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

  changeAvatar($event: string) {
    this.student.avatar = $event;
  }

  ngSubmit() {
    this.studentService.updateStudent(this.student).subscribe();
  }
}
