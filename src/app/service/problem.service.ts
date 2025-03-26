import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse} from "../pagination/interface";

@Injectable ({
    providedIn: 'root'
})

export class ProblemService {
 private apiUrl = 'https://kep.uz/api/problems';

    constructor(private http: HttpClient) {}

    getProblems(page: number, pageSize:number): Observable<ApiResponse> {
        const params = {
            page: page.toString(),
            pageSize: pageSize.toString(),
        };

        return this.http.get<ApiResponse>(this.apiUrl, {params});
    }
}

