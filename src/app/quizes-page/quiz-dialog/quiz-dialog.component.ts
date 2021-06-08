import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DialogBase } from 'src/app/@helpers/dialog-base';
import { QuizService } from 'src/app/@services/quiz.service';
import { iQuiz } from 'src/interfaces/backend-interfaces';

@Component({
    selector: 'app-quiz-dialog',
    templateUrl: './quiz-dialog.component.html',
    styleUrls: ['./quiz-dialog.component.scss']
})
export class QuizDialogComponent extends DialogBase<QuizDialogComponent> implements OnInit {

    quiz: iQuiz;

    get quiz_title() {
        return this.form.controls.quiz_title;
    }

    constructor(
        injector: Injector,
        private readonly quizService: QuizService)
    {
        super(injector);
    }

    // overrided
    ngOnInit() {
        this.quiz = this.data.quiz;
        super.ngOnInit();
    }

    // overrided
    buildForm() {
        return this.fb.group({
            quiz_title: [this.quiz?.title || '', Validators.required]
        })
    }

    // overrided
    async executeSaving() {
        if (this.quiz) {
            const editedQuiz = await this.quizService.update(this.quiz._id, this.quiz_title.value);
            this.dialogRef.close(editedQuiz);
        }
        else {
            const createdQuiz = await this.quizService.create(this.quiz_title.value);
            this.dialogRef.close(createdQuiz);
        }
    }

}