import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubKeeper } from 'src/app/@helpers/sub-keeper';
import { StatusService } from 'src/app/@services/status.service';
import { iStatus } from 'src/interfaces/backend-interfaces';
import { TypedObject } from 'src/interfaces/frontend-interfaces';

@Component({
    selector: 'app-edit-dialog',
    templateUrl: './edit-status-dialog.component.html',
    styleUrls: ['./edit-status-dialog.component.scss']
})
export class EditDialogComponent implements OnInit, OnDestroy {

    title: string;
    status: iStatus;

    loading = false;
    form: FormGroup;

    subs = new SubKeeper();

    get status_text() {
        return this.form.controls.status_text;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly data: TypedObject,
        public readonly dialogRef: MatDialogRef<EditDialogComponent>,
        private readonly snackBar: MatSnackBar,
        private readonly statusService: StatusService,
        private readonly fb: FormBuilder) { }

    ngOnInit(): void {
        this.status = this.data.status;
        this.title = this.status ? 'Edit status' : 'Create new status';

        this.form = this.fb.group({
            status_text: [this.data.status?.text || '', [Validators.required]]
        })
    }

    ngOnDestroy() {
        this.subs.unsubAll();
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
                // edit existing status
                if (this.status) {
                    const editedStatus = await this.statusService.update(this.status._id, this.status_text.value);
                    this.dialogRef.close(editedStatus);
                }
                // create new status
                else {
                    const createdStatus = await this.statusService.create(this.data.activity, this.status_text.value);
                    this.dialogRef.close(createdStatus);
                }
            }
            catch (e) {
                this.snackBar.open('Failed. Try again later!', 'Dismiss', {duration: 2000});
                this.dialogRef.close();
            }
        }
    }

}