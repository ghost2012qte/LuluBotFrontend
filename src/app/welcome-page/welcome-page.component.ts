import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

    adminCode: string;

    constructor() { }

    ngOnInit() {
        this.adminCode = localStorage.getItem('admin_code');
    }

    saveCodeToLS() {
        localStorage.setItem('admin_code', this.adminCode);
    }

}
