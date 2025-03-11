import { Component, inject, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from '../../interfaces';
import { ProductListComponent } from '../../components/products/product-list/product-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductFormComponent } from '../../components/products/product-form/product-form.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    ProductFormComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public productsService: ProductService = inject(ProductService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  @ViewChild('addProductsModal') public addProductsModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  productForm = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: ['', Validators.required],
    cantidadEnStock: ['', Validators.required],
    categoria: ['', Validators.required]
  })

  constructor() {
    this.productsService.search.page = 1;
    this.productsService.getAll();
  }

  saveProduct(product: IProduct) {
    this.productsService.save(product);
    this.modalService.closeAll();
  }

  callEdition(product: IProduct) {
    this.productForm.controls['id'].setValue(product.id ? JSON.stringify(product.id) : '');
    this.productForm.controls['nombre'].setValue(product.nombre ? product.nombre : '');
    this.productForm.controls['descripcion'].setValue(product.descripcion ? product.descripcion : '');
    this.productForm.controls['precio'].setValue(product.precio ? JSON.stringify(product.precio) : '');
    this.productForm.controls['cantidadEnStock'].setValue(product.cantidadEnStock ? JSON.stringify(product.cantidadEnStock) : '');
    this.productForm.controls['categoria'].setValue(product.categoria ? JSON.stringify(product.categoria.id) : '');
    this.modalService.displayModal('md', this.addProductsModal);
  }
  
  updateProduct(product: IProduct) {
    this.productsService.update(product);
    this.modalService.closeAll();
  }

}
