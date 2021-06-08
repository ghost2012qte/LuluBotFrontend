import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { iQuiz } from 'src/interfaces/backend-interfaces';

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    constructor(private readonly http: HttpClient) { }

    getAll() {
        return this.http.get<iQuiz[]>(env.api_url + 'quizzes').toPromise();
    }

    create(title: string) {
        return this.http.post<iQuiz>(env.api_url + 'quizzes', {title: title}).toPromise();
    }

    delete(id: string) {
        return this.http.delete<iQuiz>(env.api_url + 'quizzes/' + id).toPromise();
    }

    update(id: string, title: string) {
        return this.http.put<iQuiz>(env.api_url + 'quizzes/' + id, {title: title}).toPromise();
    }

    createQuestion(quizId: string, text: string) {
        return this.http.post<any>(env.api_url + 'questionAdd/' + quizId, {text: text}).toPromise();
    }

}