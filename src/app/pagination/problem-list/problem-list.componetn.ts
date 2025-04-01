import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from "@angular/core";
import { ProblemService } from './../../service/problem.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Problem } from '../interface';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'problem-list',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule,  MatPaginatorModule],
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

    constructor(private problemService: ProblemService) {}

    ngOnInit() { 
        this.loadProblems();
    }

  
    loadProblems() {

        this.problemService.getProblems(this.currentPage+1, this.pageSize).subscribe({
            next: (response) => {
                console.log(`Backenddan kelgan malumotlar soni: ${response.data.length}`);
                this.dataSource.data = response.data; // DataSource uchun ma'lumotlarni yangilash
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