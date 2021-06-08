import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SubKeeper } from 'src/app/@helpers/sub-keeper';
import { QuizService } from 'src/app/@services/quiz.service';
import { iQuiz } from 'src/interfaces/backend-interfaces';
import { TypedObject } from 'src/interfaces/frontend-interfaces';

@Component({
    selector: 'app-quiz-dialog',
    templateUrl: './quiz-dialog.component.html',
    styleUrls: ['./quiz-dialog.component.scss']
})
export class QuizDialogComponent implements OnInit, OnDestroy {

    quiz: iQuiz;

    loading = false;
    form: FormGroup;

    subs = new SubKeeper();

    get quiz_name() {
        return this.form.controls.quiz_name;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly data: TypedObject,
        public readonly dialogRef: MatDialogRef<QuizDialogComponent>,
        private readonly quizService: QuizService,
        private readonly fb: FormBuilder) { }

    ngOnInit() {
        this.quiz = this.data as iQuiz;

        this.form = this.fb.group({
            quiz_name: [this.quiz?.title || '', Validators.required]
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
        for (let key in this.form.controls) {
            this.form.controls[key].markAsDirty();
        }
        if (!this.form.valid) return;
        this.loading = true;
        try {
            // EDIT EXISTING QUIZ
            if (this.quiz) {
                const editedQuiz = await this.quizService.update(this.quiz._id, this.quiz_name.value);
                console.log('edited quiz', editedQuiz);
                this.dialogRef.close(editedQuiz);
            }
            // CREATE NEW QUIZ
            else {
                const createdQuiz = await this.quizService.create(this.quiz_name.value);
                this.dialogRef.close(createdQuiz);
            }
        }
        catch {

        }
    }

}