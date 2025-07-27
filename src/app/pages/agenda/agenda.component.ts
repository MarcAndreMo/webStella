import { Component, inject, OnInit } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MenuItem  } from 'primeng/api';
import { NgClass, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { Tag } from 'primeng/tag';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Agenda } from '../../models/agenda';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { SortAltIcon } from 'primeng/icons';


@Component({
  selector: 'app-agenda',
  imports: [
    Menubar,
    BadgeModule,
    ButtonModule,
    NgClass, 
    NgIf,
    TableModule,
    CommonModule,
    Dialog,
    InputTextModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DatePicker,
    Tag,
    PaginatorModule,
    ToastModule,
    ConfirmDialog,
    
  ],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css',
  providers: [CustomerService, MessageService, ConfirmationService]
})

export class AgendaComponent implements OnInit {
  //navbar
  agendas: any[] = [];
  time: Date[] | undefined;
  date: Date[] | undefined;
  statuses!: any[];

  //editar agenda
  agenda!: Agenda[];
  clonedAgenda: { [s: string]: Agenda} = {}

  //limite de fechas
  //actualizar
  minDate: string = '';

  //consulta nueva
  minDate2: Date = new Date();

  //form del agendamiento
    addConsulta: FormGroup;
    nombre: FormControl;
    fecha: FormControl;
    hora: FormControl;
    telefono: FormControl;

  constructor(
    private customerService: CustomerService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.nombre = new FormControl('');
    this.fecha = new FormControl('');
    this.hora = new FormControl('');
    this.telefono = new FormControl('');
    this.addConsulta = new FormGroup({
      nombre: this.nombre,
      fecha: this.fecha,
      hora: this.hora,
      telefono: this.telefono
    })
  }

  router = inject(Router);
  items: MenuItem[] | undefined;
  visible: boolean = false; 
  //status
  loadDemoData() {
    this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];
  }
  getSeverity(status: string){
      switch (status) {
          case 'Hoy':
              return 'success';
          case 'Pronto':
              return 'warn';
          case 'Hecha':
              return 'danger';
              default:
                return 'info'; 
      }
  }
    
  ngOnInit() {
    this.items = [
          {
              label: 'INICIO',
              icon: 'pi pi-home',
              command: () =>this.router.navigate(['/home']),
          },
          {
              label: 'CONSULTA',
              icon: 'pi pi-envelope',
              command: () =>this.router.navigate(['/home/consulta']),
          },
          {
            label: 'ASISTENTE VIRTUAL',
            icon: 'pi pi-envelope',
            command: () =>this.router.navigate(['/home/asistentevirtual']),
          }
      ]
      this.CargarAgendas();
      this.setMinDate();
      this.setMinDate2();
    }

showDialog() {
  this.visible = true;
}

setMinDate(){
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0'); 
  this.minDate = `${year}-${month}-${day}`;
}

setMinDate2(){
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  this.minDate2 = today;
}

CargarAgendas() {
  this.customerService.getAgenda().subscribe((data) => {
    this.agendas = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    this.actualizarEstadosDeAgenda();
  });
}

AgregarConsulta() {
  if (this.addConsulta.valid) {
    const consultaData = this.addConsulta.value;
    const hora = consultaData.hora;
    if (!this.validarHora(hora)) {
      alert('La hora debe estar entre las 08:30 y las 17:59.');
      return;
    }
   //agregar el 593 al telefono
    let telefono = consultaData.telefono;
    if (telefono.startsWith('0')) {
       telefono = '593' + telefono.slice(1); 
    }
    // Llamar al servicio para agregar la consulta
    this.customerService.addAgenda(telefono, consultaData.fecha, consultaData.hora)
      .subscribe({
        next: () => {
          this.visible = false; 
          this.CargarAgendas(); 
          this.addConsulta.reset(); 
          this.messageService.add({
            severity: 'info',
            summary: 'Cita agregada',
            detail: 'La cita ha sido agregada correctamente'
          });
        },
        error: (err) => {
          console.error('Error al agendar la consulta:', err);
          this.messageService.add({
            severity: 'info',
            summary: 'Cancelado',
            detail: 'La eliminación fue cancelada'
          });
        }
      });
  } else {
    alert('Por favor, complete todos los campos.');
  }
}

validarHora(hora: string): boolean {
  const [horas, minutos] = hora.split(':').map(Number);
  const horaIngresada = horas * 60 + minutos;
  const inicio = 8 * 60 + 30; // 08:30 en minutos
  const fin = 17 * 60 + 59; // 17:59 en minutos

  return horaIngresada >= inicio && horaIngresada <= fin;
}

editarColumna(agenda: Agenda){
  this.clonedAgenda[agenda.id as string] = { ...agenda };
}

// obtenerEstadoPorFecha(fecha: string): string {
//   const fechaCita = new Date(fecha);
//   const hoy = new Date();

//   // Convertir ambas fechas a solo "Año-Mes-Día" (sin horas)
//   const fechaCitaStr = fechaCita.toISOString().split('T')[0]; 
//   const hoyStr = hoy.toISOString().split('T')[0]; 

//   if (fechaCitaStr === hoyStr) {
//     return 'Hoy';
//   } else if (fechaCita > hoy) {
//     return 'Pronto'; 
//   } else {
//     return 'Hecha'; 
//   }
// }

actualizarEstadosDeAgenda() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Eliminar hora para comparar solo fecha

  this.agendas = this.agendas.map((agenda: any) => {
    const fechaCita = new Date(agenda.fecha); // agenda.fecha viene como string
    fechaCita.setHours(0, 0, 0, 0); // Normaliza la hora también

    if (fechaCita.getTime() === hoy.getTime()) {
      agenda.status = 'HOY';
    } else if (fechaCita.getTime() < hoy.getTime()) {
      agenda.status = 'REALIZADA';
    } else {
      agenda.status = 'PRONTO';
    }

    return agenda;
  });
}


Guardaredit(agenda: any): void{
  if (!agenda._id) {
    console.error('Error: No se puede actualizar una agenda sin ID');
    return;
  }
  agenda.status = this.actualizarEstadosDeAgenda();
  this.customerService.updateAgenda(agenda._id, agenda).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'info',
        summary: 'Actualización exitosa',
        detail: 'La cita ha sido actualizada correctamente'
      });      
    },
    error: (err) => console.error('Error al actualizar agenda:', err)
  });

}

confirmarBorrado(agenda: any): void {
  this.confirmationService.confirm({
    message: '¿Estás seguro de que deseas eliminar esta cita?',
    header: 'Eliminar cita',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí',
    rejectLabel: 'Cancelar',
    acceptButtonProps: {
      severity: 'danger'
    },
    rejectButtonProps: {
      severity: 'secondary',
      outlined: true
    },
    accept: () => {
      this.customerService.deleteAgenda(agenda._id).subscribe(
        () => {
          this.agendas = this.agendas.filter(item => item._id !== agenda._id);
          this.CargarAgendas();
          this.messageService.add({
            severity: 'warn',
            summary: 'Cita eliminada',
            detail: 'La cita ha sido eliminada correctamente'
          });
        },
        (error) => {
          console.error('Error al eliminar la cita:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar la cita'
          });
        }
      );
    },
    reject: () => {
      this.messageService.add({
        severity: 'info',
        summary: 'Cancelado',
        detail: 'La eliminación fue cancelada'
      });
    }
  });
}

Canceledit(agenda: Agenda, index: number){
  this.agendas[index] = this.clonedAgenda[agenda.id as string];
  delete this.clonedAgenda[agenda.id as string];
}

}

