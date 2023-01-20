import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Interfaces
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})

export class ModalDeleteComponent {

  constructor(
    private _dialogReference: MatDialogRef<ModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEmployee:Employee
  ) { }

  confirmDeletion() {
    
    if (this.dataEmployee) { 
      this._dialogReference.close("Delete")
    }

  }

}
