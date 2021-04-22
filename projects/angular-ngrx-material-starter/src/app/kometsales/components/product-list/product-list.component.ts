import { ProductDialogComponent } from './../product-dialog/product-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {  PageEvent, MatPaginator  } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { MatSort } from '@angular/material/sort';

import { HttpEventType, HttpResponse } from '@angular/common/http';



@Component({
  selector: 'anms-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  public displayedColumns = ['name', 'count', 'date_start', 'prize', 'gain', 'total', 'iva',  'tipo', 'details', 'update', 'delete'];
  
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  
  products: Product[];
  
  dataSource = new MatTableDataSource<Product>();  
  loading: boolean = true;

  type = 'success';
  
  //files
  selectedFiles: FileList;
  //array process bars  
  progressInfo = [];
  message = '';
  imageName = "";

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(private productService: ProductService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {

    //Paginate
    this.getProductsPage('0', '5', 'count');
    this.progressInfo[0] = { value: 0, fileName: "" };
    
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public redirectToDetails = (id: string) => {
    
  }
  public redirectToUpdate = (product: Product) => {

    console.log("redirectToUpdate "+product.name);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

  
    //pass objet product
    dialogConfig.data = {      
      name: product.name,
      cost: product.cost,
      count: product.count,
      date_start: product.date_start,
      prize: product.prize,
  };


  const dialogRef = this.dialog.open(ProductDialogComponent,
      dialogConfig);

 console.log(dialogRef)
  dialogRef.afterClosed().subscribe(
      val => console.log("Dialog output:", val)
  );
    
  }
  public redirectToDelete = (id: string) => {
    
  }

  //Methods
  public getProducts = () => {
    this.productService.getProductsList()
    .subscribe(res => {
      this.loading = false;
      this.dataSource.data = res as Product[];
      this.dataSource.paginator = this.paginator;
    })
  }
  //paginate and sorting methods start
  public getProductsPage = (offset, limit, sort) => {
           
    this.productService.getProductsListPage(offset, limit, sort)
    .subscribe((res: any) => {

      this.loading = false;
    
      this.products = res.products;
      this.products.length = res.totalItems;

      this.dataSource = new MatTableDataSource<any>(this.products);


      this.dataSource.paginator = this.paginator;
      
    })
  }

  //paginate and sorting next button
  public getProductsPageNext = (currentSize, offset, limit, sort) => {
           
    this.productService.getProductsListPage(offset, limit, sort)
   
    .subscribe((res: any) => {
      
      this.loading = false;
     
      this.products.length = currentSize;
      this.products.push(...res.products);

      this.products.length = res.totalItems;
      this.dataSource = new MatTableDataSource<any>(this.products);
      
      this.dataSource._updateChangeSubscription();
           
      this.dataSource.paginator = this.paginator;
    })
  }


  pageChanged(event){
    this.loading = true;

    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;

    let previousIndex = event.previousPageIndex;

    let previousSize = pageSize * pageIndex;

    this.getProductsPageNext(previousSize, (pageIndex).toString(), pageSize.toString(), 'count');
  }

  //files methods
  selectFiles(event) {
    this.progressInfo = [];
    event.target.files.length == 1 ? this.imageName = event.target.files[0].name : this.imageName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
  }

  upload(index, file) {
    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.productService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
          this.getProductsPage('0', '5', 'count');
        } else if (event instanceof HttpResponse) {
          
        }
      },
      err => {
        this.progressInfo[index].value = 0;
        this.message = 'No se puede subir el archivo ' + file.name;
      });
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

 

}

