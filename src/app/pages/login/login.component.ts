import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../component/header/header.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormControl, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-login',
  imports: [
    //RouterLink,
    HeaderComponent,
    CardModule,
    ButtonModule, 
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css', 
  providers: [LoginService]
})
export class LoginComponent {

  loginForm: FormGroup;
  name: FormControl;
  price: FormControl;



  constructor( private loginService: LoginService){
    this.name = new FormControl('');
    this.price = new FormControl('');

    this.loginForm = new FormGroup({
      name: this.name,
      price: this.price
    })


  }

  router = inject(Router);

  onLogin(): void{

    const price = Number(this.loginForm.value.price);

    this.loginService.login(this.loginForm.value.name,
      price).subscribe(
      (response) => {
        console.log('Login exitoso',response);
         this.router.navigateByUrl("home");
      },
      (response) => {
        console.log('Login exitoso',response);
        alert('Contrasenia incorrecta');      }
    );

  }
 

}
