import { Component, OnInit } from "@angular/core";
import { ProblemService } from './../../service/problem.service';

@Component ({
    selector: 'problem-list',
    standalone: true,
    imports: [],
    templateUrl: './problem-list.component.html',
    styleUrl: './problem-list.component.css',
})

export class ProblemListComponent implements OnInit {
    constructor(private problemService: ProblemService) {}


    ngOnInit() {
        
        this.problemService.getProblems(1, 20).subscribe({
            next: (response) => {
                console.log("Api dan olingan javob:", response)
            },
            
            error: (err) =>{
                console.log('Xatolik:', err)
            }
        })
    }
}