import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product';
import { Router } from '@angular/router';



@Component({
  selector: 'anms-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit {

  //variables
  products: Product[];
  type = 'success';
  message = 'Operacion realizada con exito';

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {

    //Traemos la lista de productos una vez inicie la pantalla
    this.getProducts();

  }

  //Metodos
  private getProducts(){

    this.productService.getProductsList().subscribe(data =>{

      this.products = data;

      }
    )

  }

}
