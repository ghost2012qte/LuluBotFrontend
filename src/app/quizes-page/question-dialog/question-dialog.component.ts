import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DialogBase } from 'src/app/@helpers/dialog-base';
import { QuizService } from 'src/app/@services/quiz.service';
import { iQuestion, iQuiz } from 'src/interfaces/backend-interfaces';

@Component({
    selector: 'app-question-dialog',
    templateUrl: './question-dialog.component.html',
    styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent extends DialogBase<QuestionDialogComponent> implements OnInit {

    title: string;
    quiz: iQuiz;
    question: iQuestion;

    get question_text() {
        return this.form.controls.question_text;
    }

    constructor(
        readonly injector: Injector,
        private readonly quizService: QuizService)
    {
        super(injector);
    }

    // overrided
    ngOnInit() {
        this.quiz = this.data.quiz;
        this.question = this.data.question;
        this.title = this.question ? 'Edit Question' : 'Create Question';
        super.ngOnInit();
    }

    // overrided
    buildForm() {
        return this.form = this.fb.group({
            question_text: [this.question?.text || '', Validators.required]
        })
    }

    // overrided
    async executeSaving() {
        if (this.question) {

        }
        else {

        }
    }

}