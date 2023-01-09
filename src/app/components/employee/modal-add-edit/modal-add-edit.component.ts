import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Interfaces
import { Department } from 'src/app/interfaces/department';
import { Employee } from 'src/app/interfaces/employee';

// Servicios
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.css']
})

export class ModalAddEditComponent implements OnInit {

  formEmployee: FormGroup;
  actionTitle:string = "New";
  actionButton:string = "Save";
  departmentsList: Department[] = [];

  constructor (
    private _dialogReference: MatDialogRef<ModalAddEditComponent>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _departmentService: DepartmentService,
    private _employeeService: EmployeeService
  )
  {
    
    this.formEmployee = this._formBuilder.group({
      FullName: ['', Validators.required],
      Salary: ['', Validators.required],
      IdDepartment: ['', Validators.required]
    });

    // Cargamos la lista de daprtamentos
    this._departmentService.getList().subscribe({

      next:( data ) => {
        
        this.departmentsList = data
        console.log( this.departmentsList );
      },
      error:( error ) => { console.log(error); }
    });

  }

  ngOnInit() {

    // this.addEditEmployee();

  }

  showAlert(message: string, action: string) {

    this._snackBar.open(
      message,
      action, 
      { 
        horizontalPosition:"center",
        verticalPosition:"top",
        duration: 3000
      }
    );

  }

  addEditEmployee() {

    // console.log( this.formEmployee.value );

    const employee:Employee = {
      idTEmployee: 0,
      fullName: this.formEmployee.value.FullName,
      idFDepartment: this.formEmployee.value.IdDepartment,
      salary: this.formEmployee.value.Salary
    }

    console.log( employee );
    
    this._employeeService.add(employee).subscribe({

      next:( data ) => {

        this.showAlert("Successfully created employee","Done!");
        this._dialogReference.close("Created");

      },
      error:( error ) => {
        console.log( error );
        this.showAlert("Could not create employee","Done!");
      }

    })

  }

}

