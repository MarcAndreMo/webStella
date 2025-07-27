import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './component/layout/layout.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { AvirtualComponent } from './pages/avirtual/avirtual.component';
import { PacienteDetailComponent } from './pages/paciente-detail/paciente-detail.component';
import { InicioComponent } from './pages/inicio/inicio.component';


export const routes: Routes = [
    {
        path:'', 
        redirectTo:'Principal', 
        pathMatch:'full'
    },
    {
        path:'Principal',
        component: InicioComponent,

    },
    {
        path:'login',
        component: LoginComponent
    }, 
    {
        path:'',
        component:LayoutComponent,
        children:[
            {path:'home',component: HomeComponent},
            {path:'home/agenda',component: AgendaComponent},
            {path:'home/consulta',component: ConsultaComponent},
            {path:'home/consulta/paciente/:telefono',component: PacienteDetailComponent},
            {path:'home/asistentevirtual',component: AvirtualComponent}

        ]

    }

];




