import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ICategoria, ISearch } from '../interfaces';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService<ICategoria> {
  protected override source: string = 'categorias';
  private categoriaListSignal = signal<ICategoria[]>([]);
  get categorias$() {
    return this.categoriaListSignal;
  }
  public search: ISearch = { 
    page: 1,
    size: 5
  }
  public totalItems: any = [];
  private authService: AuthService = inject(AuthService);
  private alertService: AlertService = inject(AlertService);

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
        next: (response: any) => {
            console.log('Response:', response);
            if (Array.isArray(response)) {                                
                this.categoriaListSignal.set(response); 
                this.search = { ...this.search, totalPages: 1 }; 
                const totalPages = this.search.totalPages ?? 0;
                this.totalItems = Array.from({ length: totalPages }, (_, i) => i + 1);
            } else {
                console.error('Invalid response format:', response);
            }
        },
        error: (err: any) => {
            console.error('Error:', err);
        }
    });
}

  
  save(categoria: ICategoria) {
    this.add( categoria).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding the category','center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  update(categoria: ICategoria) {
    this.editCustomSource(`${categoria.id}`, categoria).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred updating the category','center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(categoria: ICategoria) {
    this.delCustomSource(`${categoria.id}`).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', "category deleted", 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the category','center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

}
