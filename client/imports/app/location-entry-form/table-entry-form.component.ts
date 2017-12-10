import { Component, Input, Output,EventEmitter } from '@angular/core';

import { TableForm } from './location-entry-form';

@Component({
    selector: 'table-entry',
    templateUrl: 'table-entry.html',
    styleUrls:[]
})

export class TableComponent {
  tableStatus = [true,false];

  @Input() table: TableForm;
  @Input('location') locationName: string;
  @Output() removeTableEvent = new EventEmitter<TableForm>();
  @Output() editTableEvent = new EventEmitter<TableForm>();

  removeTable(){
   console.log("Remove Table in table")
   var tableToRemove = this.table;
   this.table.remove = true;
   console.log(this.table);
   this.removeTableEvent.emit(this.table);
  }

  onTableSubmit(){
    console.log("Submit and Log");
    var tableToEdit = this.table;
    this.table.remove = true;
    this.editTableEvent.emit(this.table)

  }

}
