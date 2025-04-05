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
    tags?: string[];
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
        status: '',
        tags: []
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
        {value: 'unknown', viewValue: 'Unknown'},
        {value: 'unsolved', viewValue: 'Unsolved'}
    ];

    //Taglar Royhati
    tagOptions = [
        {value: '58', viewValue:'NP'},
        {value: '61', viewValue:'Array'},
        {value: '18', viewValue:'Matrix'},
        {value: '96', viewValue:'Ad Hoc'},
        {value: '41', viewValue:'Hack it'},
        {value: '65', viewValue:'Hashing'},
        {value: '95', viewValue:'Two-run'},
        {value: '31', viewValue:'Sorting'},
        {value: '63', viewValue:'Geometry'},
        {value: '77', viewValue:'Recursion'},
        {value: '73', viewValue:'Binary power'},
        {value: '60', viewValue:'Bruterdorce'},
        {value: '93', viewValue:'Probability'},
        {value: '93', viewValue:'Probability'},
        {value: '97', viewValue:'Constructive'},
        {value: '59', viewValue:'Graph theory'},
        {value: '71', viewValue:'Binary search'},
        {value: '68', viewValue:'Combinatorics'},
        {value: '76', viewValue:'Number theory'},
        {value: '56', viewValue:'Partial solve'},
        {value: '75', viewValue:'Implementation'},
        {value: '4',  viewValue:'Data Structures'},
        {value: '72', viewValue:'Ternery search'},
        {value: '90', viewValue:'Long arifmetic'},
        {value: '62', viewValue:'Greddy algoritms'},
        {value: '57', viewValue:'Generic algorithm'},
        {value: '23', viewValue:'Bitwise operators'},
        {value: '64', viewValue:'Dynamic Programming'},
        {value: '53', viewValue:'Interactive problem'},
        {value: '94', viewValue:'Randomized algorithms'},
    ];

    applyFilter() {
        this.filterChanged.emit(this.filter);
    }
    
}



