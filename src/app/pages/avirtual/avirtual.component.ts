import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { NgClass, NgIf } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormsModule } from '@angular/forms';
import { Servicios } from '../../models/servicios';
import { AsistvirtualService } from '../../services/asistvirtual.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-avirtual',
  imports: [
    HttpClientModule,
    Menubar,
    NgClass, 
    NgIf,
    BadgeModule,
    CardModule,
    ButtonModule,
    IftaLabelModule,
    FormsModule
  ],
  templateUrl: './avirtual.component.html',
  styleUrl: './avirtual.component.css'
})
export class AvirtualComponent implements OnInit {
  items: MenuItem[] | undefined;
  router = inject(Router);
  
  combosID = '6885765ac79e9383f540a3fe';
  depilacionID = '6885767fac16c2b04345af0f';
  especialID = '688576a0f588a30ee14a526f';
  corporalID = '688574cb9fee562315aa4f20';
  inferioeresID = '688576c5ba3b73f0f97011f7';
  facialID = '688576ed698609eca79b73e4';

      value_combos: string = '';
      value_depilacion: string = '';
      value_desintoxicacion: string = '';
      value_corporal: string = '';
      value_piernas: string = '';
      value_facial: string = '';

  constructor( 
    private asistvirtualService: AsistvirtualService,
    private http: HttpClient
    
    
  ) { 
  }

  ngOnInit() {
    this.items = [
        {
            label: 'INICIO',
            icon: 'pi pi-home',
            command: () =>this.router.navigate(['/home']),
      },
        {
            label: 'AGENDA',
            icon: 'pi pi-envelope',
            command: () =>this.router.navigate(['/home/agenda']),
        },
        {
          label: 'CONSULTA',
          icon: 'pi pi-envelope',
          command: () =>this.router.navigate(['/home/consulta']),

        }
    ]

    this.getServicioPorId(this.combosID, 'combos');
    this.getServicioPorId(this.depilacionID, 'depilacion');
    this.getServicioPorId(this.especialID, 'especial');
    this.getServicioPorId(this.corporalID, 'corporal');
    this.getServicioPorId(this.inferioeresID,   'inferioeres');
    this.getServicioPorId(this.facialID, 'facial');
  
  }

  getServicioPorId(id: string, tipo: string): void {
  this.asistvirtualService.getServicioPorId(id).subscribe({
    next: (servicio: Servicios) => {
      switch (tipo) {
        case 'combos':
          this.value_combos = servicio.descripcion;
          break;
        case 'depilacion':
          this.value_depilacion = servicio.descripcion;
          break;
        case 'especial':
          this.value_desintoxicacion = servicio.descripcion;
          break;
        case 'corporal':
          this.value_corporal = servicio.descripcion;
          break;
        case 'inferioeres':
          this.value_piernas = servicio.descripcion;
          break;
        case 'facial':
          this.value_facial = servicio.descripcion;
          break;
      }
    },
    error: (error) => {
      console.error('Error al obtener el servicio:', error);
    }
  });
  }

updateServicioPorId(id: string, descripcion: string, precio?: number): void {
  const data: Partial<Servicios> = {
    descripcion: descripcion,
  };

  if (precio !== undefined) {
    data.precio = precio;
  }

  this.asistvirtualService.putServicioporId(id, data).subscribe({
    next: (res) => {
      console.log('Servicio actualizado:', res);
    },
    error: (err) => {
      console.error('Error al actualizar servicio:', err);
    }
  });
}

  

}
