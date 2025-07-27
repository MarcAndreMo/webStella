import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [

      BadgeModule,

  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  router = inject(Router);

  constructor(){}

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Login',
        icon: 'pi pi-envelope',
        command: () =>this.router.navigate(['/login']),
      }
    ];
  }

}


