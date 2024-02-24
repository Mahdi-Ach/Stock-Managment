import { LiveAnnouncer } from '@angular/cdk/a11y';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from '../../Service/product.service';

export interface productint{
  id:number,
  productname:string,
  description:string,
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProductComponent implements AfterViewInit{
  @ViewChild(MatSort,{ static: true }) sort!: MatSort;
  displayedColumns: string[] = ['select', 'id','product_name','description','Edit','Delete'];
  dataSource = new MatTableDataSource<productint>();
  selection = new SelectionModel<productint>(true, []);
  row: productint | null
  constructor(
    private prodservice:ProductService,
    private _liveAnnouncer: LiveAnnouncer,
    private _snackBar: MatSnackBar,
    private route:Router
  ){}
  length=0;
  totalpages=0;
  pageIndex=0;
  pageSize=5;
  showpagination=false
  column="id"
  sort_type="desc"
  filtervalue:string="";
  show_button:boolean=true
  selected_item_id:any[] = []
  no_datafound:boolean = false
  text_search:string="";
  downloadfile: string[] = [
    "csv",
    "excel",
  ]
  selected_way:string = this.downloadfile[0]
  ngAfterViewInit(): void {
    this.fetch_product_page()
    this.dataSource.sort = this.sort;
  }
  reset_text(search_text:any){
    search_text.value = ""
    this.text_search = ""
    this.fetch_product_page()
  }
  applyFilter(event: any) {
    this.text_search = event.target.value
    this.fetch_product_page()
  }
  announceSortChange(sortState: Sort) {
    this.sort_type = sortState.direction
    if(!sortState.direction){
      this.column = "id"
    }else{
      this.column = sortState.active;
    }
    this.fetch_product_page()
  }
  fetch_product_page(e:any=null) {
    console.log(e)
    if(e?.pagesize!=undefined){
      this.pageSize = e.pagesize;
      this.pageIndex = Math.ceil(this.length/e.pagesize)<=this.pageIndex ? Math.ceil(this.length/e.pagesize)-1: this.pageIndex
    }else if(e?.currentpage!=undefined){
      this.pageIndex = e.currentpage
    }
    this.prodservice.get_product_page({page:this.pageIndex,size:this.pageSize,sort_type:this.sort_type,column:this.column,filtervalue:this.text_search},"http://localhost:8080/v1/list-Product")
    .subscribe({
      next : (value)=>{
        console.log(value)
        this.dataSource.data = value.content;
        this.length = value.totalelements
       
        this.totalpages = value.totalpage
        this.showpagination=true
        console.log(this.isAllSelected(),this.totalpages == this.pageIndex,this.pageIndex)
        if(this.isAllSelected() && this.totalpages == this.pageIndex){
          this.pageIndex-=1
          if(this.pageIndex != -1){
            this.fetch_product_page()
          }else{
            this.pageIndex = 0
          }
        }
      },
      error : (err)=>console.log(err)
    })
  }
  


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach((row:any) => {
          row.selected = true
          this.selection.select(row)
          this.selected_item_id.push(row.id)
        });
  }

  toggleCheckbox(row:any) {
    this.selection.toggle(row)
    row.selected = !row.selected;
    if(row.selected){
      this.selected_item_id.push(row.id)
    }else{
      this.selected_item_id = this.selected_item_id.filter((row_id)=>row_id!= row.id)
    }
    console.log(this.selected_item_id)
  }

  deleteproductsservice(product_id:any=null){
    this.prodservice.deleteproduct_ByListId("http://localhost:8080/v1/product/delete",product_id).subscribe({
      next: (value:any)=>{
        this.fetch_product_page()
        this.selection.clear()
        this.selected_item_id = []
      },
      error: (err)=>{
        this.no_datafound = true
        this._snackBar.open(err.error["nodata"],"Close");
      }
    })
  }

  removeproduct(e:any,row:any){
    e.stopPropagation()
    this.deleteproductsservice([row])
  }

  edit(id:any){
    this.route.navigate(['/edit-product/'+id]);
  }

  selectdownloadingway(e:any){
    console.log(e)
    this.selected_way = e.value
  }
}
