import { Component, inject, ViewChild } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalService } from '../../services/modal.service';
import { ICategoria, IRoleType } from '../../interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CategoriasListComponent } from '../../components/categorias/categoria-list/categoria-list.component';
import { CategoriasFormComponent } from '../../components/categorias/categoria-form/categoria-form.component';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CategoriasListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    CategoriasFormComponent
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriasComponent {
  public categoriasService: CategoriaService = inject(CategoriaService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  @ViewChild('addCategoriasModal') public addCategoriasModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  categoriaForm = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
  })

  constructor() {
    this.categoriasService.search.page = 1;
    this.authService.isSuperAdmin() ?  this.categoriasService.getAll() : this.categoriasService.getAll();
  }

  saveCategoria(categoria: ICategoria) {
    this.categoriasService.save(categoria);
    this.modalService.closeAll();
  }

  callEdition(categoria: ICategoria) {
    this.categoriaForm.controls['id'].setValue(categoria.id ? JSON.stringify(categoria.id) : '');
    this.categoriaForm.controls['nombre'].setValue(categoria.nombre ? categoria.nombre : '');
    this.categoriaForm.controls['descripcion'].setValue(categoria.descripcion ? categoria.descripcion : '');
    this.modalService.displayModal('md', this.addCategoriasModal);
  }
  
  updateCategoria(categoria: ICategoria) {
    this.categoriasService.update(categoria);
    this.modalService.closeAll();
  }
}
