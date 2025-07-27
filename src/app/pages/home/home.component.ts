import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    CardModule,
    ButtonModule,
    DividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  router = inject(Router);

  onAgenda(): void{
    this.router.navigateByUrl("home/agenda");
  }

  onConsulta(): void{
    this.router.navigateByUrl("home/consulta");
  }

  onAsistente(): void{
    this.router.navigateByUrl("home/asistentevirtual");
  }

}
