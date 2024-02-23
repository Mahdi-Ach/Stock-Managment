import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../Service/product.service';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrl: './createproduct.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CreateproductComponent  {
  src: any;
  productForm:any
  selectedfile:File
  erreurs:{}={}
  constructor(private productservice:ProductService,private formbuilder:FormBuilder){
    this.productForm = formbuilder.group({
      productname:[''],
      description:[''],
      quantite:[''],
      price:[''],
      costprice:[''],
      currency:[''],
      stockLevel:[''],
      filename:['']
    })
   
  }

  encodeImageFileAsURL() {
    var fileInput = document.getElementById("file") as HTMLInputElement
    this.selectedfile = fileInput.files[0]
    this.productForm.controls['filename'].value = this.selectedfile.name
    var reader = new FileReader();
    reader.onloadend = () =>{
      let img = document.querySelector(".img") as HTMLImageElement
      this.src = reader.result
      img.src = this.src
    }
    reader.readAsDataURL(this.selectedfile);
  }
  
  Saveproduct(control:any){
      let controls = this.productForm.controls
      this.productservice.saveproduct("http://localhost:8080/v1/product",controls,this.selectedfile)
      .subscribe({
        next: (value:any)=>{
          
        },
        error: (err)=>{
          console.log(err.error)
          this.erreurs = JSON.parse(err.error)
          for (const [key, val] of Object.entries(this.erreurs)) {
            let erreur = {}
            erreur[key] = this.erreurs[key]
            this.productForm.controls[key].setErrors(erreur)
          }
        }
      })
    
  }
}
