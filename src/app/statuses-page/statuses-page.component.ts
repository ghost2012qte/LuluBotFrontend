import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { iStatus } from 'src/interfaces/backend-interfaces';
import { iError, TypedObject } from 'src/interfaces/frontend-interfaces';
import { StatusService } from '../@services/status.service';
import { EditDialogComponent } from './edit-status-dialog/edit-status-dialog.component';

@Component({
    selector: 'app-statuses-page',
    templateUrl: './statuses-page.component.html',
    styleUrls: ['./statuses-page.component.scss']
})
export class StatusesPageComponent implements OnInit {
    
    error: iError;
    statuses: TypedObject<iStatus[]>;

    constructor(
        private readonly dialog: MatDialog,
        private readonly statusService: StatusService) { }

    ngOnInit() {
        this.loadStatuses();
    }

    async loadStatuses() {
        this.statuses = null;
        try {
            const data = await this.statusService.getAll();
            this.statuses = {LISTENING: [], WATCHING: [], PLAYING: []};
            data.forEach(st => this.statuses[st.activity].push(st));
        }
        catch (e) {
            this.error = e.error;
            this.statuses = {};
        }
    }

    openCreateNewStatusDialog(activity: string) {
        const ref = this.dialog.open(EditDialogComponent, {
            data: {
                activity: activity,
                status: null
            }
        })
        ref.afterClosed().subscribe((status: iStatus) => {
            if (status) {
                this.statuses[status.activity].push(status);
            }
        })
    }

    openEditStatusDialog(activity: string, status: iStatus) {
        const ref = this.dialog.open(EditDialogComponent, {
            data: {
                activity: activity,
                status: status
            }
        })
        ref.afterClosed().subscribe((status: iStatus) => {
            if (status) {
                this.statuses[status.activity] = this.statuses[status.activity].map(s => s._id == status._id ? status : s);
            }
        })
    }

    async deleteStatus(e: MouseEvent, status: iStatus) {
        e.stopPropagation();
        await this.statusService.delete(status._id);
        this.statuses[status.activity] = this.statuses[status.activity].filter(s => s._id !== status._id);
    }

    trackByStatusId(i: number, status: iStatus) {
        return status._id;
    }

}