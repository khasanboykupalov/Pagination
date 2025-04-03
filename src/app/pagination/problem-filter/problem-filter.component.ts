import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, viewChild } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

interface ProblemFilter {
    title: string;
    difficulty:string;
    status:string;
}

@Component({
    selector: 'problem-filter',
    standalone: true,
    imports:[ CommonModule, MatFormFieldModule, FormsModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatInputModule, MatSelectModule],
    templateUrl:'./problem-filter.component.html',
    styleUrl:'./problem-filter.component.css'
})

export class ProblemFilterComponent {

    @Output() filterChanged = new EventEmitter<ProblemFilter>();

    filter: ProblemFilter = {
        title:'',
        difficulty: '',
        status: ''
    }


    difficultyOptions = [
        {value: '', viewValue:'All'},
        {value: 'basic', viewValue:'Basic'},
        {value: 'beginner', viewValue:'Beginner'},
        {value: 'normal', viewValue: 'Normal'},
        {value: 'medium', viewValue: 'Medium'},
        {value: 'advanced', viewValue: 'Adevanced'},
        {value: 'hard', viewValue: 'Hard'}
    ];

    statusOptions = [
        {value: '', viewValue:'All'},
        {value: 'solved', viewValue: 'Solved'},
        {value: 'unsolved', viewValue: 'Unsolved'},
        {value: 'unknown', viewValue: 'Unknown'}
    ];

    applyFilter() {
        this.filterChanged.emit(this.filter);
    }

    resetFilter() {
        this.filter = {
            title: '',
            difficulty:'',
            status:''
        };

        this.filterChanged.emit(this.filter)
    }
    
}



