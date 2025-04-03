
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse} from "../pagination/interface";
import { unsubscribe } from "diagnostics_channel";

@Injectable ({
    providedIn: 'root'
})

export class ProblemService {
 private apiUrl = 'https://kep.uz/api/problems';

    constructor(private http: HttpClient) {}

    getProblems(params:{
        page: number,
        pageSize: number,
        title: string,
        difficulty: number,
        solved?: boolean,
        attempted?: boolean 
    }): Observable<ApiResponse> {
       
        let httpParams = new HttpParams()
        .set('page', params.page.toString())
        .set('page_size', params.pageSize.toString());

        if(params.title) {
            httpParams = httpParams.set('title', params.title)
        }

        if(params.difficulty) {
            httpParams = httpParams.set('difficulty', params.difficulty.toString());
        }

        if(params.solved !== undefined) {
            httpParams = httpParams.set('solved', params.solved.toString())
        }

        if(params.attempted !== undefined) {
            httpParams = httpParams.set('attempted', params.attempted.toString());
        }
   

        console.log('Backendga yuborilayotgan parametrlar:', httpParams.toString());

        return this.http.get<ApiResponse>(this.apiUrl, {params: httpParams});
    }
}

