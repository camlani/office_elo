import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
    selector: 'table-status-child',
    templateUrl: 'table-status-child.html',
    styleUrls:[]
})

export class TableStatusChild {
    @Input() id: string;
    @Input() name: string;
    @Input() status: boolean;
    @Output() toggleStatusEvent = new EventEmitter<any>();

    toggleStatus(){
        
        if (this.status === false){
            let objToUpdate = {
                id: this.id,
                status: true,
                name: this.name
            }
            this.toggleStatusEvent.emit(objToUpdate)
        } else {
            let objToUpdate = {
                id: this.id,
                status: false,
                name: this.name
            }
            this.toggleStatusEvent.emit(objToUpdate)
        }
    }
}