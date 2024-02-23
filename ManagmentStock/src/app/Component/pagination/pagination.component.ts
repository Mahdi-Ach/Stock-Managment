import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

interface PageSize {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent{
 
  @Input() pageindex!:number;
  @Input() length!:number;
  @Input() totalpages!:number;
  @ViewChild('currentpage') currentpage: any; 
  @Output() pageChanged = new EventEmitter<{}>();
  @Output() sizeChanged = new EventEmitter<{}>();
  pagesize: PageSize[] = [
    {value: '5', viewValue: '5'},
    {value: '10', viewValue: '10'},
    {value: '20', viewValue: '20'},
  ];

  selectedPageSize:any = this.pagesize[0].value;

  selectpagesize_event(e:any){
    this.sizeChanged.emit({pagesize:parseInt(e.value)})
  }
  leftslide(){
    this.pageindex = this.pageindex - 1;
    this.pageChanged.emit({currentpage:this.pageindex});
  }
  rightslide(){
    this.pageindex+=1;
    console.log(this.pageindex)
    this.pageChanged.emit({currentpage:this.pageindex});
  }
}
