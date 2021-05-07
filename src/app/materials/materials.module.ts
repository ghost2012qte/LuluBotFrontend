import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const modules = [
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ...modules
    ],
    exports: modules
})
export class MaterialsModule { }
