import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { MaterialsModule } from './materials/materials.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { StatusesPageComponent } from './statuses-page/statuses-page.component';
import { QuizesPageComponent } from './quizes-page/quizes-page.component';
import { LoaderComponent } from './loader/loader.component';
import { TokenInterceptor } from './token-interceptor';
import { FormsModule } from '@angular/forms';
import { OnKeyPressedDirective } from './@directives/on-key-pressed.directive';


@NgModule({
    declarations: [
        AppComponent,
        WelcomePageComponent,
        StatusesPageComponent,
        QuizesPageComponent,
        LoaderComponent,
        OnKeyPressedDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MaterialsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
