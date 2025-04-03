import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProblemListComponent } from './pagination/problem-list/problem-list.componetn';
import { ProblemService } from './service/problem.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProblemListComponent, HttpClientModule, ],
  providers: [ ProblemService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Kep-Problem';
}
