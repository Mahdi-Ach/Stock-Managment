import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Service/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.css'
})
export class EditproductComponent implements OnInit{
  src: any;
  productForm:any
  selectedfile:File
  olddata:{}={}
  extension:string
  file:string
  base64_img:string
  id:string
  erreurs:{}={}

  constructor(private productservice:ProductService,private formbuilder:FormBuilder,private route:ActivatedRoute){
    this.productForm = this.formbuilder.group({
      id:[''],
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
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.productservice.getproductbyId("http://localhost:8080/v1/product/",this.id).subscribe({
      next: (data)=>{
        /*for (const [key, value] of Object.entries(data)) {
          this.olddata[key] = value
        }*/
        console.log(data)
        this.productForm.controls['id'].setValue(data['id'])
        this.productForm.controls['productname'].setValue(data['productname'])
        this.productForm.controls['description'].setValue(data['description'])
        this.productForm.controls['quantite'].setValue(data['quantite'])
        this.productForm.controls['price'].setValue(data['price'])
        this.productForm.controls['costprice'].setValue(data['costprice'])
        this.productForm.controls['currency'].setValue(data['currency'])
        this.productForm.controls['stockLevel'].setValue(data['stockLevel'])
        this.productForm.controls['filename'].setValue(data['filename'])
        
        this.extension = data['extensionfile']
        this.file = data['file']
        this.base64_img = "data:image/"+this.extension+";base64,"+this.file
        let img = document.querySelector(".img") as HTMLImageElement
        img.src = this.base64_img
      },
      error: (err)=>{
        console.log(err)
      }
    });
  }

  encodeImageFileAsURL() {
    var fileInput = document.getElementById("file") as HTMLInputElement
    this.selectedfile = fileInput.files[0]
    
    var reader = new FileReader();
    reader.onloadend = () =>{
      let img = document.querySelector(".img") as HTMLImageElement
      console.log(img)
      this.src = reader.result
      img.src = this.src
    }
    reader.readAsDataURL(this.selectedfile);
  }

  Edit_Product(){
    console.log(this.olddata)
    let data_updated = {}
    for (const [key, val] of Object.entries(this.productForm.controls)) {
      let field = val['value']
      //if(field != this.olddata[key]){
        data_updated[key] = field;
      //}
    }
    console.log(data_updated)
    let img = document.querySelector(".img") as HTMLImageElement
    if(img.src != this.base64_img){
      data_updated['file'] = this.selectedfile
    }
    this.productservice.updateproduct("http://localhost:8080/v1/product/update/"+this.id,data_updated)
    .subscribe({
      next : (val)=>{
        data_updated = {}
      },
      error: (err)=>{
      console.log(err)
        this.erreurs = err.error
        for (const [key, val] of Object.entries(this.erreurs)) {
          let erreur = {}
          erreur[key] = this.erreurs[key]
          this.productForm.controls[key].setErrors(erreur)
        }
      }
      
    })
  }
}
