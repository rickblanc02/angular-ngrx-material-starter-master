import { Observable } from 'rxjs';
import { Product } from './../../models/product';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as moment from 'moment';


@Component({
  selector: 'anms-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDialogComponent implements OnInit {

  form: FormGroup;
  
  name:string;
  descripcion:string;
  //name: Observable<string>;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    
    //@Inject(MAT_DIALOG_DATA) {name,prize, count, date_start, cost}:Product ) {
      @Inject(MAT_DIALOG_DATA) product:Product ) {

    this.descripcion ="Editar Producto";
    this.name =product.name;
    
  

    this.form = fb.group({
      name: [product.name, Validators.required],
      prize: [product.prize, Validators.required],
      count: [product.count, Validators.required],
      //date_start: [moment(), Validators.required],
      date_start: [product.date_start, Validators.required],
      cost: [product.cost,Validators.required]
    });   

}

  ngOnInit(): void {
    console.log(this.dialogRef)
    console.log(this.fb)
  }

  save() {
    this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}

}
