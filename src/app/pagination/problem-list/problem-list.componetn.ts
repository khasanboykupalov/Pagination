import { CommonModule } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { ProblemService } from './../../service/problem.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Problem } from '../interface';

@Component({
    selector: 'problem-list',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule],
    templateUrl: './problem-list.component.html',
    styleUrl: './problem-list.component.css',
})
export class ProblemListComponent implements OnInit {

    problems: Problem[] = [];
    dataSource = new MatTableDataSource<Problem>(this.problems);
    displayedColumns: string[] = ['id', 'title', 'solved', 'author', 'tags', 'difficultyTitle', 'actions'];

    constructor(private problemService: ProblemService) {}

    ngOnInit() { 
        this.loadProblem(1, 20);
    }
        
    loadProblem(page: number, pageSize: number) {
        this.problemService.getProblems(page, pageSize).subscribe({
            next: (response) => {
                console.log('API dan olingan javob:', response);
                this.problems = response.data;

                
                this.dataSource.data = [...this.problems];
                console.log('dataSource:', this.dataSource.data);
            }, 
            error: (err) => {
                console.log('Xatolik:', err);
            }
        });
    }

            //  Difficulty  uchun classni olish funksiyasi

    getDifficultyClass(difficultyTitle:string): string {
        if(!difficultyTitle) return 'difficulty-unknown';

           // Bo'sh joylarni olib tashlash,

        const formattedTitle =  difficultyTitle.toLocaleLowerCase()
        .replace(/\s+/g, '')
        .replace(/'/g, '')

            // Difficultyga mos klasslar

        const difficultyClasses: {[key: string]: string} = {
            
            'beginner': 'difficulty-beginner',
            'basic'   : 'difficulty-basic',
            'normal'  : 'difficulty-normal',
            'medium'  : 'difficulty-medium',
            'hard'    : 'difficulty-hard',
            'advanced': 'difficulty-advanced'

        };
            return difficultyClasses[formattedTitle] || 'difficulty-unknown'
    }

    // Lide Disliske Count

    likeProblem(id: number) {
        console.log('Like problem:', id);
    }

    dislikeProblem(id: number) {
        console.log('Dislike problem:', id);
    }
}