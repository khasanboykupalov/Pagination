export interface ApiResponse{
    page: number;
    pageSize: number;
    count: number;
    total: number;
    pagesCount: number
    data: Problem[]; 
}


export interface Problem {
    id: number;
    title: string;
    difficulty: number;
    difficultyTitle: string;
    solved: number;
    userInfo:{ hasSolved: boolean; hasAttempted: boolean; };
    authorUsername: string;
    notSolved: number;
    attemptsCount: number;
    hasChecker: boolean;
    tags: {id: number; name: string} [];
    hasSolution: boolean;
    solutionKepcoinValue: number;
    likesCount: number;
    dislikesCount: number;
    hidden: boolean
}

export interface ProblemFilter {
    title:string,
    difficulty:string,
    status:string,
    tags:number[]
}

