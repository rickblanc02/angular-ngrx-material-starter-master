import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';

ProductListComponent

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: { title: 'anms.menu.about' }
  },
  {
    path: 'list',
    component: ProductListComponent,
    data: { title: 'anms.menu.about' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KometSalesRoutingModule {}
