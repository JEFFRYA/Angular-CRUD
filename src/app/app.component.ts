import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// interfaz
import { Employee } from './interfaces/employee';

// Servicio
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['FullName', 'NameDepartment', 'Salary', 'Actions'];
  dataSource = new MatTableDataSource<Employee>();

  constructor(private _employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.ShowEmployees();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter( event: Event ) {

    const filterValue = ( event.target as HTMLInputElement ).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if ( this.dataSource.paginator ) {
      this.dataSource.paginator.firstPage();
    }

  }

  ShowEmployees() {
    this._employeeService.getList().subscribe( {
      next: ( data ) => {
        console.log( data );
        this.dataSource.data = data;
      },
      error: (e) => {}
    });
  }

}



/**
 * @title Table with pagination, filter
 */