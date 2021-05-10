import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusService } from 'src/app/@services/status.service';
import { TypedObject } from 'src/interfaces/frontend-interfaces';

@Component({
    selector: 'app-edit-dialog',
    templateUrl: './edit-status-dialog.component.html',
    styleUrls: ['./edit-status-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

    title: string;

    loading = false;
    form: FormGroup;

    get status_text() {
        return this.form.controls.status_text;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly data: TypedObject,
        public readonly dialogRef: MatDialogRef<EditDialogComponent>,
        private readonly statusService: StatusService,
        private readonly fb: FormBuilder) { }

    ngOnInit(): void {
        this.title = this.data.status ? 'Edit status' : 'Create new status';

        this.form = this.fb.group({
            status_text: [this.data.status?.text || '', [Validators.required]]
        })
    }

    cancel() {
        if (!this.loading) this.dialogRef.close();
    }

    async save() {
        for (let key in this.form.controls) {
            this.form.controls[key].markAsDirty();
        }
        if (this.form.valid) {
            this.dialogRef.disableClose = true;
            this.loading = true;
            try {
                const createdStatus = await this.statusService.create(this.data.activity, this.status_text.value);
                this.dialogRef.close(createdStatus);
            }
            catch (e) {
                console.log(e);
            }
        }
    }

}