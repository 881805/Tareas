import { CategoriaService } from './../../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../../interfaces';
import { CategoriasListComponent } from '../../categorias/categoria-list/categoria-list.component';
import { CategoriasFormComponent } from '../../categorias/categoria-form/categoria-form.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CategoriasListComponent,
    CategoriasFormComponent
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  public CategoriaService: CategoriaService = inject(CategoriaService);

  constructor() {
    this.CategoriaService.search.page = 1;
    this.CategoriaService.getAll();
  }


  @Input() productForm!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callUpdateMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();



  
  callSave() {
    let Idcategoria: number = this.productForm.controls['categoria'].value;

    let product: IProduct = {
      nombre: this.productForm.controls['nombre'].value,
      descripcion: this.productForm.controls['descripcion'].value,
      precio: this.productForm.controls['precio'].value,
      cantidadEnStock: this.productForm.controls['cantidadEnStock'].value,
      categoria: { id: Idcategoria }

    }
    if(this.productForm.controls['id'].value) {
      product.id = this.productForm.controls['id'].value;
    } 
    if(product.id) {
      this.callUpdateMethod.emit(product);
    } else {
      this.callSaveMethod.emit(product);
    }
  }
}
