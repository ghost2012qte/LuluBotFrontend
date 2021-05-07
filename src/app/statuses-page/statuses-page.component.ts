import { Component, OnInit } from '@angular/core';
import { iStatus } from 'src/interfaces/backend-interfaces';
import { TypedObject } from 'src/interfaces/frontend-interfaces';
import { StatusService } from '../@services/status.service';

@Component({
    selector: 'app-statuses-page',
    templateUrl: './statuses-page.component.html',
    styleUrls: ['./statuses-page.component.scss']
})
export class StatusesPageComponent implements OnInit {

    statuses: TypedObject<iStatus[]>;

    constructor(
        private readonly statusService: StatusService) { }

    ngOnInit() {
        this.loadStatuses();
    }

    async loadStatuses() {
        this.statuses = null;
        const data = await this.statusService.getAll();
        this.statuses = {LISTENING: [], WATCHING: [], PLAYING: []};
        data.forEach(st => this.statuses[st.activity].push(st));
    }

}
