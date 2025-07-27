import { Component, inject, OnInit } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { NgClass, NgIf } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { HistInfobas } from '../../models/hist-infobas';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { Tratamiento } from '../../models/tratamiento';



@Component({
  selector: 'app-paciente-detail',
  imports: [
    Menubar,
    BadgeModule,
    NgClass, 
    NgIf,
    CardModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
    DividerModule,
    ImageModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Dialog
  ],
  templateUrl: './paciente-detail.component.html',
  styleUrl: './paciente-detail.component.css',
  providers: [PacienteService],
})
export class PacienteDetailComponent implements OnInit {

  router = inject(Router);

  histInfobas: HistInfobas[] = [];

  paciente: HistInfobas | undefined;
  citas: any[] = [];
  procedimientos: any[] = [];

  paciente_info!: HistInfobas[];
  clonedPacientes: { [s: string]: HistInfobas } = {};
  edit: boolean = false;

  clonedTratamientos: { [s: string]: Tratamiento } = {};
  visible: boolean = false; 


  //form info basica 
  addInfoBas: FormGroup;
  nombre_completo: FormControl;
  fecha_nacimiento: FormControl;
  edad: FormControl;
  telefono: FormControl;
  direccion: FormControl;
  correo: FormControl;
  genero: FormControl;
  sangre: FormControl;
  peso: FormControl;
  altura: FormControl;
  alergias: FormControl;
  enfermedades: FormControl;
  contacto_emergencia: FormControl;
  relacion: FormControl;
  telefono_emergencia: FormControl;

  // form tratamiento
  addTratamiento: FormGroup;
  tratamiento: FormControl;
  recomendaciones: FormControl;
  evaluacion: FormControl;
  observaciones: FormControl;


  constructor(
    private route: ActivatedRoute,
    private pacienteservice: PacienteService,
  ) {
    // Inicializar el formulario de información básica
    this.nombre_completo = new FormControl('');
    this.fecha_nacimiento = new FormControl('');
    this.edad = new FormControl('');
    this.telefono = new FormControl('');
    this.direccion = new FormControl('');
    this.correo = new FormControl('');
    this.genero = new FormControl('');
    this.sangre = new FormControl('');
    this.peso = new FormControl('');
    this.altura = new FormControl('');
    this.alergias = new FormControl('');
    this.enfermedades = new FormControl('');
    this.contacto_emergencia = new FormControl('');
    this.relacion = new FormControl('');
    this.telefono_emergencia = new FormControl('');

    this.addInfoBas = new FormGroup({
      nombre_completo: this.nombre_completo,
      fecha_nacimiento: this.fecha_nacimiento,
      edad: this.edad,
      telefono: this.telefono,
      direccion: this.direccion,
      correo: this.correo,
      genero: this.genero,
      sangre: this.sangre,
      peso: this.peso,
      altura: this.altura,
      alergias: this.alergias,
      enfermedades: this.enfermedades,
      contacto_emergencia: this.contacto_emergencia,
      relacion: this.relacion,
      telefono_emergencia: this.telefono_emergencia
    });

    // Inicializar el formulario de tratamiento
    this.tratamiento = new FormControl('');
    this.recomendaciones = new FormControl('');
    this.evaluacion = new FormControl('');
    this.observaciones = new FormControl('');

    this.addTratamiento = new FormGroup({
      tratamiento: this.tratamiento,
      recomendaciones: this.recomendaciones,
      evaluacion: this.evaluacion,
      observaciones: this.observaciones
    });


  }

    items: MenuItem[] | undefined;

  
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

        },
        {
          label: 'ASISTENTE VIRTUAL',
          icon: 'pi pi-envelope',
          command: () =>this.router.navigate(['/home/asistentevirtual']),

        }
    ]

    this.traerData(); 
    this.traerCitas();
    this.traerTratamiento();

  }

  editarColumna(paciente_info: HistInfobas){
    this.clonedPacientes[paciente_info.id as string] = { ...paciente_info };
  }

  editarTratamiento(procedimiento: Tratamiento) {
    this.clonedTratamientos[procedimiento._id.toString()] = { ...procedimiento };
    console.log('Tratamiento editado:', procedimiento);
  }

  guardarTratamiento(procedimiento: Tratamiento): void {
    if (!procedimiento._id) {
      console.error('Error: No se puede actualizar un tratamiento sin ID');
      return;
    }

    this.pacienteservice.updateTratamiento(procedimiento._id, procedimiento).subscribe({
      next: (response) => {
        console.log('Tratamiento actualizado correctamente:', response);
        this.traerTratamiento(); // Refrescar los tratamientos del paciente
      },
      error: (error) => {
        console.error('Error al actualizar el tratamiento:', error);
      }
    });
  }
  


  //traer los datos del paciente
  traerData() {
    let telefono = this.route.snapshot.paramMap.get('telefono');
    if(telefono){
      if(telefono.startsWith('0')){
        telefono = telefono.replace(/^0/, '593');
      }

      this.pacienteservice.getPacientePorTelefono(telefono).subscribe((data) => {
        this.histInfobas = data;
        this.paciente = data;
      })
    }
  }

  //traer las citas del paciente
  traerCitas() {
    let telefono = this.route.snapshot.paramMap.get('telefono');
    if(telefono){
      if(telefono.startsWith('0')){
        telefono = telefono.replace(/^0/, '593');
      }

      this.pacienteservice.getCitasPorTelefono(telefono).subscribe((data) => {
        this.citas = data;
        console.log(this.citas);
      })
    }
  }

  //traer los tratamientos del paciente
  traerTratamiento() {
    let telefono = this.route.snapshot.paramMap.get('telefono');
    if(telefono){
      if(telefono.startsWith('0')){
        telefono = telefono.replace(/^0/, '593');
      }

      this.pacienteservice.getTratamientoPorTelefono(telefono).subscribe((data) => {
        this.procedimientos = data;
      })
    }
  }

  editar(): void {
    this.edit = true;

    this.addInfoBas.patchValue({
      nombre_completo: this.paciente?.nombre_completo,
      fecha_nacimiento: this.paciente?.fecha_nacimiento,
      edad: this.paciente?.edad,
      telefono: this.paciente?.telefono,
      direccion: this.paciente?.direccion,
      correo: this.paciente?.correo,
      genero: this.paciente?.genero,
      sangre: this.paciente?.sangre,
      peso: this.paciente?.peso,
      altura: this.paciente?.altura,
      alergias: this.paciente?.alergias,
      enfermedades: this.paciente?.enfermedades,
      contacto_emergencia: this.paciente?.contacto_emergencia,
      relacion: this.paciente?.relacion,
      telefono_emergencia: this.paciente?.telefono_emergencia,
    });
  }

  AgregarInfo(){
    if(this.addInfoBas.valid) {
      const infoData = this.addInfoBas.value;
      let telefono = infoData.telefono;

      if (telefono.startsWith('0')) {
        telefono = '593' + telefono.slice(1); // reemplaza solo el primer 0
      }

      // Llamar al servicio para agregar la info basica
      this.pacienteservice.updatePaciente(telefono, infoData).subscribe({
        next: (response) => {
          console.log('Información actualizada:', response);
          this.edit = false;
          this.traerData(); // Refrescar los datos del paciente
        },
        error: (error) => {
          console.error('Error al actualizar la información:', error);
        }
      });
    }
  }

  showDialog() {
    this.visible = true;
  }

  AgregarTratamiento(){
    if(this.addTratamiento.valid) {
      const tratamientoData = this.addTratamiento.value;
      let telefono = this.route.snapshot.paramMap.get('telefono');

      if (telefono && telefono.startsWith('0')) {
        telefono = '593' + telefono.slice(1); // reemplaza solo el primer 0
      }
      
      if (!telefono) {
        console.error('No se encontró el teléfono en la URL.');
        return; // o muestra un mensaje al usuario
      }

      // Llamar al servicio para agregar el tratamiento
      this.pacienteservice.addTratamiento(telefono, tratamientoData).subscribe({
        next: (response) => {
          console.log('Tratamiento agregado:', response);
          this.addTratamiento.reset();
          this.visible = false; // Cerrar el diálogo
          this.traerTratamiento(); // Refrescar los tratamientos del paciente
        },
        error: (error) => {
          console.error('Error al agregar el tratamiento:', error);
        }
      });
  }
  }

  cancelarEdicion(procedimiento: Tratamiento, index: number): void {
    this.procedimientos[index] = this.clonedTratamientos[procedimiento._id.toString()];
    delete this.clonedTratamientos[procedimiento._id.toString()];
  }

  eliminarProcedimiento(procedimiento: Tratamiento): void {
    if (!procedimiento._id) {
      console.error('Error: No se puede eliminar un tratamiento sin ID');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar el tratamiento?')) {
    this.pacienteservice.deleteTratamiento(procedimiento._id).subscribe({
      next: (response) => {
        console.log('Tratamiento eliminado correctamente:', response);
        this.traerTratamiento(); // Refrescar los tratamientos del paciente
      },
      error: (error) => {
        console.error('Error al eliminar el tratamiento:', error);
      }
    });
  }
}

}
