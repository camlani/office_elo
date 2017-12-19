import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
    selector: 'table-status-array',
    templateUrl: 'table-status-array.html',
    styleUrls:[]
})

export class TableStatusArray {
    @Input() tables: any[];


    //To summarize what I have experienced, am able to make a match 
    //basically I have the array of locations
    //which are limited to one which is good
    //now I cannot access the tables array
    // I tried eventmitter, I think next tme will try
    // and pass everything to somethign at once
    //from locations -> tables array while stayig within the format

   // @Output() toggleStatusEvent = new EventEmitter<any>();

    // toggleStatus(){
        
    //     if (this.status === false){
    //         let objToUpdate = {
    //             id: this.id,
    //             status: true,
    //             name: this.name
    //         }
    //         this.toggleStatusEvent.emit(objToUpdate)
    //     } else {
    //         let objToUpdate = {
    //             id: this.id,
    //             status: false,
    //             name: this.name
    //         }
    //         this.toggleStatusEvent.emit(objToUpdate)
    //     }
    // }
}