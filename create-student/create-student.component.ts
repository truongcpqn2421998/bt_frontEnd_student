import {Component, OnInit} from '@angular/core';
import {Student} from '../../model/student';
import {StudentService} from '../../service/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {
  form: any = {};
  status = 'Please fill in the form to create Category!';
  student: Student;


  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
  }

  ngSubmit() {
    this.student = new Student(
      this.form.name,
      this.form.birthDay,
      this.form.avatar,
      this.form.gender
    );
    console.log(this.student);
    this.studentService.createStudent(this.student).subscribe();
  }

  onUploadAvatar($event) {
    this.form.avatar = $event;
  }
}
