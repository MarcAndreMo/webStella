import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:5000/paciente';

  constructor( private http: HttpClient ) { 

  }

  //obtener los usuarios 
  getPacientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //obtener un usuario por telefono
  getPacientePorTelefono(telefono: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${telefono}`);

  }
  //actualizar Info basica del paciente
  updatePaciente(telefono: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${telefono}/update`, data);
  }

  //obtener las citas del paciente
  getCitasPorTelefono(telefono: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/citas/${telefono}`);
  }

  //obtener tratamiento del paciente
  getTratamientoPorTelefono(telefono: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tratamientos/${telefono}`);
  }
  //agg tratamiento del paciente
  addTratamiento(telefono: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tratamientos/${telefono}/create`, data);
  }

  //update tratamiento del paciente
  updateTratamiento(_id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/tratamientos/${_id}/update`, data);
  }

  //delete tratamiento del paciente
  deleteTratamiento(_id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tratamientos/${_id}/delete`);
  }
  
}
