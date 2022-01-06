import {Component, OnInit, ViewChild} from '@angular/core';
import {Student} from '../../model/student';
import {MatPaginator} from '@angular/material/paginator';
import {StudentService} from '../../service/student.service';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'birthDay', 'avatar', 'gender', 'edit', 'delete'];
  dataSource: any;
  students: Student[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private studentService: StudentService,
              private dialog: MatDialog
              ) {
  }

  ngOnInit(): void {
    this.getListStudent();
  }

  getListStudent() {
    this.studentService.listStudent().subscribe(listStudent => {
      this.students = listStudent;
      this.dataSource = new MatTableDataSource<Student>(this.students);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCategory(id: number) {
    this.studentService.deleteById(id).subscribe(() => {
      this.getListStudent();
    });
  }
  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCategory(id);
      }
      console.log(`Dialog result: ${result}`);
    });
  }
}
