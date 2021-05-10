import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { iStatus } from 'src/interfaces/backend-interfaces';
import { StatusActivity, TypedObject } from 'src/interfaces/frontend-interfaces';

@Injectable({ providedIn: 'root' })
export class StatusService {

    constructor(private readonly http: HttpClient) { }

    getAll(activity?: StatusActivity) {
        const params: TypedObject<string> = {};
        if (activity) {
            params.activity = activity;
        }
        return this.http
            .get<iStatus[]>(environment.api_url + 'statuses', {params: params})
            .toPromise();
    }

    create(activity: string, text: string) {
        return this.http
            .post<iStatus>(environment.api_url + 'statuses', {activity: activity, text: text})
            .toPromise();
    }
}
