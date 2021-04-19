
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { KometSalesRoutingModule } from './kometsales-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';

@NgModule({
  declarations: [ProductListComponent, ProductDialogComponent],
  imports: [
    CommonModule,
    SharedModule, 
    KometSalesRoutingModule
  ],
  providers: []
})
export class KometsalesModule { }
