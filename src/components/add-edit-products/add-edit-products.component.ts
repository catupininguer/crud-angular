import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { ProductService } from '../../services/product.service';
import { Toast, ToastrService } from 'ngx-toastr';
//import {  HttpClientModule } from '@angular/common/http';

@Component({

  selector: 'app-add-edit-products',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-edit-products.component.html',
  styleUrl: './add-edit-products.component.css'
})

export class AddEditProductsComponent implements OnInit {
  form: FormGroup;
  id: number;
  operacion: string= 'Agregar '; 

  constructor (private fb: FormBuilder,
    private _productService: ProductService, 
    private router: Router,
    private toastr: ToastrService , 
    private aRouter: ActivatedRoute){
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
      categoria: [null, Validators.required]
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'))
    console.log(this.id)

  }

  ngOnInit(): void {
    if( this.id != 0) {
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }

  getProduct(id: number){
    this._productService.getProduct(id).subscribe((data:Product) => {
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoria: data.categoria
      })
    })
    }
  
  addProduct(){
    const product: Product= {
    name: this.form.value.name,
    description: this.form.value.description,
    price: this.form.value.price,
    stock: this.form.value.stock,
    categoria: this.form.value.categoria
  }

  if(this.id != 0){
    product.id= this.id
    this._productService.updateProduct(this.id, product).subscribe(()=>{
      this.toastr.success(`El producto ${product.name} fue actualizado con exito!`, 'Producto actualizado')
      this.router.navigate(['/']);

    })
  }else{
    this._productService.saveProduct(product).subscribe(()=> {
      this.toastr.success(`El producto ${product.name} fue registrado con exito!`, 'Producto registrado')
      this.router.navigate(['/']);

    })
  

  }


  
}
}
