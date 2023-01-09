import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

// Interfaz
import { Employee } from './interfaces/employee';

// Servicio
import { EmployeeService } from './services/employee.service';

// Componente
import { ModalAddEditComponent } from './components/employee/modal-add-edit/modal-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['FullName', 'NameDepartment', 'Salary', 'Actions'];
  dataSource = new MatTableDataSource<Employee>();

  constructor(
    private _employeeService: EmployeeService,
    public dialog: MatDialog
  ) { }

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
        this.dataSource.data = data;
      },
      error: ( error ) => { console.log(error); }
    });
  }

  addEmployee() {
    this.dialog.open(
      ModalAddEditComponent,
      {
        disableClose: true,
        width: "350px"
      }
    ).afterClosed().subscribe( result => {
      if(result === "Created") {
        this.ShowEmployees();
      }
    });
  }

  editEmployee(employee: Employee) {
    this.dialog.open(
      ModalAddEditComponent,
      {
        disableClose: true,
        width: "350px",
        data: employee
      }
    ).afterClosed().subscribe( result => {
      if(result === "Edited") {
        this.ShowEmployees();
      }
    });
  }

}

/**
 * @title Table with pagination, filter
 */