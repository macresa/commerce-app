import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardActions } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/product';
import { applicationService } from 'src/app/services/application.service';
import {MatSelectModule} from '@angular/material/select';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

 export class AddProductComponent implements OnInit {
  form: FormGroup;
  category: Array<any> = []

  constructor(private fb: FormBuilder, private _service:applicationService, private _snackBar: MatSnackBar) { 
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      descripcion: [''],
      precio: ['', Validators.required],
      categoria: ['', Validators.required]
    })   
   
  }
 
  ngOnInit(): void {
 this.getCategories();
  }

  openSnackBar() {

    this._snackBar.open('Producto creado!', 'Cerrar', {
      horizontalPosition: 'right',
      duration: 3000
    });
  }
  addProduct () {
    if(this.form.valid){
      const product: Product = {
        name: this.form.value.nombre,
        brand: this.form.value.marca,
        description: this.form.value.descripcion,
        categoryId: this.form.value.categoria,
        price: this.form.value.precio
      }
    this._service.addProduct(product).subscribe(data => console.log(data));
    this.openSnackBar();
    //this.form.reset();
    }
  }

  getCategories(){
    this._service.getCategories().subscribe((data:any) =>{
      this.category = data;
    })
  }

}
