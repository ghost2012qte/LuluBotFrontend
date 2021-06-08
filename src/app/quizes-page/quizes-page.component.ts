import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenu } from '@angular/material/menu';
import { iQuestion, iQuiz } from 'src/interfaces/backend-interfaces';
import { QuizService } from '../@services/quiz.service';
import { QuizDialogComponent } from './quiz-dialog/quiz-dialog.component';

@Component({
    selector: 'app-quizes-page',
    templateUrl: './quizes-page.component.html',
    styleUrls: ['./quizes-page.component.scss']
})
export class QuizesPageComponent implements OnInit {

    quizzes: iQuiz[];

    constructor(
        private readonly dialog: MatDialog,
        private readonly quizService: QuizService) { }

    ngOnInit(): void {
        this.loadQuizzes();
    }

    async loadQuizzes() {
        this.quizzes = await this.quizService.getAll();
        console.log(this.quizzes);
    }

    createQuiz() {
        const ref = this.dialog.open(QuizDialogComponent)
        ref.afterClosed().subscribe((quiz: iQuiz) => {
            if (quiz) {
                this.quizzes.push(quiz);
            }
        })
    }

    editQuiz(quiz: iQuiz) {
        const ref = this.dialog.open(QuizDialogComponent, {
            data: quiz
        })
        ref.afterClosed().subscribe((quiz: iQuiz) => {
            if (quiz) {
                this.quizzes = this.quizzes.map(q => q._id === quiz._id ? quiz : q);
            }
        })
    }

    async deleteQuiz(quiz: iQuiz) {
        const deletedQuiz = await this.quizService.delete(quiz._id);
        this.quizzes = this.quizzes.filter(q => q._id !== deletedQuiz._id);
    }

    createQuestion(quiz: iQuiz) {

    }

    editQuestion(quiz: iQuiz, question: iQuestion) {

    }

    deleteQuestion(quiz: iQuiz, question: iQuestion) {

    }
    
}