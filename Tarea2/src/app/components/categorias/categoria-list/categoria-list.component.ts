import { AfterViewInit, Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, inject } from '@angular/core';
import { ICategoria } from '../../../interfaces';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-categorias-list',
  standalone: true,
  imports: [],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.scss'
})
export class CategoriasListComponent {
  public AuthService: AuthService = inject(AuthService);
  @Input() title: string = '';
  @Input() categorias: ICategoria[] = [];
  @Output() callModalAction: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  @Output() callDeleteAction: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
}
