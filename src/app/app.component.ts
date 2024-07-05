import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUDE_Operations';
  receivedData: any

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe((res: any) => this.receivedData = res)
  }
}
