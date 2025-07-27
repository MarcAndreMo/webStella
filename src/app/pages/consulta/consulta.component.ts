import { Component, inject } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { NgClass, NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PacienteService } from '../../services/paciente.service';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-consulta',
  imports: [Menubar,
    BadgeModule,
    NgClass, 
    NgIf,
    CardModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css',
   providers: [PacienteService] 
})

export class ConsultaComponent {

  pacientes: Paciente[] = [];
  constructor( 
    private pacienteService: PacienteService
  ){}
  router = inject(Router);
  items: MenuItem[] | undefined;

  //paginacion
  first = 0;
  rows = 10;

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
        label: 'ASISTENTE VIRTUAL',
        icon: 'pi pi-envelope',
        command: () =>this.router.navigate(['/home/asistentevirtual']),
     }
  ]
  this.traerData();
}

prev() {
  this.first = this.first - this.rows;
}

isFirstPage(): boolean {
  return this.pacientes ? this.first === 0 : true;
}

reset() {
  this.first = 0;
}

next() {
  this.first = this.first + this.rows;
}

isLastPage(): boolean {
  return this.pacientes ? this.first + this.rows >= this.pacientes.length : true;
}

pageChange(event: any) {
  this.first = event.first;
  this.rows = event.rows;
}

traerData():void{
  this.pacienteService.getPacientes().subscribe((data) =>{
  this.pacientes = data;
  })
}

OnPerfil(paciente: Paciente): void{
  this.router.navigateByUrl(`/home/consulta/paciente/${paciente.telefono}`);
}
}

