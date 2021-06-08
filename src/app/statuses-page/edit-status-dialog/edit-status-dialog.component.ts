import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DialogBase } from 'src/app/@helpers/dialog-base';
import { StatusService } from 'src/app/@services/status.service';
import { iStatus } from 'src/interfaces/backend-interfaces';

@Component({
    selector: 'app-edit-dialog',
    templateUrl: './edit-status-dialog.component.html',
    styleUrls: ['./edit-status-dialog.component.scss']
})
export class EditDialogComponent extends DialogBase<EditDialogComponent> implements OnInit {

    status: iStatus;
    title: string;

    get status_text() {
        return this.form.controls.status_text;
    }

    constructor(
        readonly injector: Injector,
        public readonly statusService: StatusService)
    {
        super(injector);
    }

    // overrided
    ngOnInit() {
        this.status = this.data.status;
        this.title = this.status ? 'Edit status' : 'Create new status';
        super.ngOnInit();
    }

    // overrided
    buildForm() {
        return this.fb.group({
            status_text: [this.data.status?.text || '', [Validators.required]]
        })
    }

    // overrided
    async executeSaving() {
        if (this.status) {
            const editedStatus = await this.statusService.update(this.status._id, this.status_text.value);
            this.dialogRef.close(editedStatus);
        }
        else {
            const createdStatus = await this.statusService.create(this.data.activity, this.status_text.value);
            this.dialogRef.close(createdStatus);
        }
    }

}