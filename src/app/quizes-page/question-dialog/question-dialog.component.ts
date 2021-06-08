import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SubKeeper } from 'src/app/@helpers/sub-keeper';
import { QuizService } from 'src/app/@services/quiz.service';
import { iQuestion } from 'src/interfaces/backend-interfaces';
import { TypedObject } from 'src/interfaces/frontend-interfaces';

@Component({
    selector: 'app-question-dialog',
    templateUrl: './question-dialog.component.html',
    styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent implements OnInit, OnDestroy {

    question: iQuestion;

    loading = false;
    form: FormGroup;

    subs = new SubKeeper();

    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly data: TypedObject,
        public readonly dialogRef: MatDialogRef<QuestionDialogComponent>,
        private readonly quizService: QuizService,
        private readonly fb: FormBuilder) { }

    ngOnInit() {
        this.question = this.data as iQuestion;
        this.form = this.fb.group({
            question_text: [this.question?.text || '', Validators.required]
        })
        this.subs.plus = fromEvent<KeyboardEvent>(window, 'keydown')
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
        this.dialogRef.close();
    }

    async save() {

    }

}