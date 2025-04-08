import { CommonModule } from '@angular/common';

import { Component, OnInit } from "@angular/core";

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { Problem, ProblemFilter} from '../interface';

import { ProblemService } from './../../service/problem.service';
import { ProblemFilterComponent } from '../problem-filter/problem-filter.component';

@Component({
    selector: 'problem-list',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, MatPaginatorModule, ProblemFilterComponent],
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
        status: '',
        tags: [] as number[]
    }

    // Saralash uchun Ozgaruvchi
    sortField: string = 'id';
    sortOrder: string = 'asc'
    

    constructor(private problemService: ProblemService) { }

    ngOnInit() {
        this.loadProblems();
    }

    loadProblems() {

        const filterParams: any = {
            page: this.currentPage + 1,
            pageSize: this.pageSize,
        };

        if (this.currentFilter.title) {
            filterParams.title = this.currentFilter.title

        }

        // Difficyltly filter
        if (this.currentFilter.difficulty) {
            const difficultyMap: Record<string, number> = {
                'beginner': 1,
                'basic': 2,
                'normal': 3,
                'medium': 4,
                'advanced': 5,
                'hard': 6
            };

            filterParams.difficulty = difficultyMap[this.currentFilter.difficulty]
        }

        //Stauts filter
        if (this.currentFilter.status === 'solved') {
            filterParams.solved = true;
        } else if (this.currentFilter.status === 'unsolved') {
            filterParams.solved = false;
        } else if (this.currentFilter.status === 'unknown') {
            filterParams.attempted = false;
        }

        //Tags Filter
        if (this.currentFilter.tags && this.currentFilter.tags.length > 0) {
            filterParams.tags = this.currentFilter.tags
        }

        // Saralash parametrlari
        filterParams.sortField = this.sortField;
        filterParams.sortOrder = this.sortOrder;

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

    //Sort 
    sortById() {
        if (this.sortField === 'id') {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = 'id'
            this.sortOrder = 'asc'
        }
        this.loadProblems()
    }

    sortByTitle() {
        if (this.sortField === 'title') {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = 'title';
            this.sortOrder = 'asc'
        }
        this.loadProblems();
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

    onFilterChange(filter:ProblemFilter) {
        this.currentFilter = filter;
        this.currentPage = 0,
            this.loadProblems();
    }

    //  Difficulty  uchun classni olish funksiyasi
    getDifficultyClass(difficultyTitle: string): string {
        if (!difficultyTitle) return 'difficulty-unknown';

        // Bosh joylarni olib tashlash,
        const formattedTitle = difficultyTitle.toLocaleLowerCase()
            .replace(/\s+/g, '')
            .replace(/'/g, '')

        // Difficultyga mos klasslar
        const difficultyClasses: { [key: string]: string } = {

            'beginner': 'difficulty-beginner',
            'basic': 'difficulty-basic',
            'normal': 'difficulty-normal',
            'medium': 'difficulty-medium',
            'hard': 'difficulty-hard',
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