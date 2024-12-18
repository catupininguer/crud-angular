import { Component, OnInit  } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
})
export class ListProductsComponent implements OnInit{
  listProducts: Product[] = [
  ]

  constructor(private _productService: ProductService, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.getListProducts();
  }
  getListProducts(){
    this._productService.getListProducts().subscribe((data: Product[]) => {
      this.listProducts = data;
    })
    
  }

  deleteProduct(id: number){
    this._productService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
      this.toastr.warning('El producto fue eliminado correctamente!', 'Producto eliminado')
    })
  }
    
}
function ngOnInit() {
  throw new Error('Function not implemented.');
} 

