import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './Component/product/product.component';
import { PaginationComponent } from './Component/pagination/pagination.component';
import { CreateproductComponent } from './Component/createproduct/createproduct.component';
import { EditproductComponent } from './Component/editproduct/editproduct.component';

const routes: Routes = [
  {path:"product-list",component:ProductComponent},
  {path:"product",component:CreateproductComponent},
  {path:"edit-product/:id",component:EditproductComponent},
  {path:"pagination",component:PaginationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
