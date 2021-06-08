import { OnInit, OnDestroy, Injector, Directive } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent } from "rxjs";
import { filter } from "rxjs/internal/operators";
import { TypedObject } from "src/interfaces/frontend-interfaces";
import { SubKeeper } from "./sub-keeper";

@Directive()
export abstract class DialogBase<D> implements OnInit, OnDestroy {
    
    // Injects
    readonly data: TypedObject;
    readonly dialogRef: MatDialogRef<D>;
    readonly snackBar: MatSnackBar;
    readonly fb: FormBuilder;

    loading = false;
    form: FormGroup;
    subs = new SubKeeper();

    constructor(injector: Injector) {
        this.data = injector.get<TypedObject>(MAT_DIALOG_DATA);
        this.dialogRef = injector.get<MatDialogRef<D>>(MatDialogRef);
        this.snackBar = injector.get(MatSnackBar);
        this.fb = injector.get(FormBuilder);
    }

    ngOnInit() {
        this.form = this.buildForm();
        this.subs.plus = this.subs.plus = fromEvent<KeyboardEvent>(window, 'keydown')
            .pipe(filter(e => e.key === 'Enter'))
            .subscribe(e => {
                e.preventDefault();
                this.save();
            })
    }

    ngOnDestroy() {
        this.subs.unsubAll();
    }

    cancel() {
        if (!this.loading) this.dialogRef.close();
    }

    save() {
        for (let key in this.form.controls) {
            this.form.controls[key].markAsDirty();
        }
        if (this.form.valid) {
            this.dialogRef.disableClose = true;
            this.loading = true;
            try {
                this.executeSaving();
            }
            catch (e) {
                this.snackBar.open('Failed. Try again later!', 'Dismiss', {duration: 2000});
                this.dialogRef.close();
            }
        }
    }

    abstract buildForm(): FormGroup;

    abstract executeSaving(): void;
    
}