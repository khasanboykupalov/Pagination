import { CommonModule } from '@angular/common';

import { Component, OnInit } from "@angular/core";

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { Problem } from '../interface';

import { ProblemService } from './../../service/problem.service';
import { ProblemFilterComponent } from '../problem-filter/problem-filter.component';





@Component({
    selector: 'problem-list',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule,  MatPaginatorModule, ProblemFilterComponent],
    templateUrl: './problem-list.component.html',
    styleUrl: './problem-list.component.css',
})
export class ProblemListComponent implements OnInit {

    problems: Problem[] = [];
    dataSource = new MatTableDataSource<Problem>([]);
    displayedColumns: string[] = ['id', 'title', 'solved', 'author', 'tags', 'difficultyTitle', 'actions'];

            //Pagaginatsiya uchu ozgaruvchi
    totalProblems = 0;   
    pageSize = 20; 
    currentPage = 0; 
    pageSizeOptions = [10, 20, 50]
    previousPageSize = this.pageSize;

    //Filter O'zgaruvchilari
    currentFilter = {
        title: '',
        difficulty: '',
        status:''
    }

    constructor(private problemService: ProblemService) {}

    ngOnInit() { 
        this.loadProblems();
    }

    loadProblems() {

        const filterParams: any = {
            title: this.currentFilter.title,
            page: this.currentPage + 1,
            pageSize:this.pageSize
        }

        // Difficyltly filter

        if(this.currentFilter.difficulty) {
            const difficultyMap: Record<string, number> = {
                 'basic': 1,
                 'beginner': 2,
                 'normal': 3,
                 'medium': 4,
                 'advanced': 5,
                 'hard': 6 
            };

            filterParams.difficulty = difficultyMap[this.currentFilter.difficulty]
        }

        //Stauts filter

        if(this.currentFilter.status === 'solved') {
            filterParams.solved = true;
        } else if (this.currentFilter.status === 'unsolved') {
            filterParams.solved = false;
        } else if (this.currentFilter.status ===  'unknown' ) {
            filterParams.attempted = false;
        }

        this.problemService.getProblems(filterParams).subscribe({
            next: (response) => {
                console.log(`Backend dan kelgan malumotlar soni: ${response.data.length}`);
                this.dataSource.data = response.data; // DataSource uchun malumotlarni yangilash
                this.totalProblems = response.total;    

            }, 
            error: (err) => {
                console.log('Xatolik:', err);
            }
        });
    }
    
            //Paginatsiya uchun method

    onPageChange(event: PageEvent) {
        if (this.pageSize !== event.pageSize) {
            const firstItemIndex = this.currentPage * this.pageSize;
            this.currentPage = Math.floor(firstItemIndex / event.pageSize);
            this.previousPageSize = this.pageSize;
        } else {
            this.currentPage = event.pageIndex;
        }

        this.pageSize = event.pageSize;
        this.loadProblems();
    }

    onFilterChange(filter:any) {
        this.currentFilter = filter;
        this.currentPage = 0,
        this.loadProblems();
        
    }

            //  Difficulty  uchun classni olish funksiyasi

    getDifficultyClass(difficultyTitle:string): string {
        if(!difficultyTitle) return 'difficulty-unknown';

           // Bosh joylarni olib tashlash,

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