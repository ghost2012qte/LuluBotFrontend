import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizesPageComponent } from './quizes-page/quizes-page.component';
import { StatusesPageComponent } from './statuses-page/statuses-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', component: WelcomePageComponent},
    {path: 'statuses', component: StatusesPageComponent},
    {path: 'quizzes', component: QuizesPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }