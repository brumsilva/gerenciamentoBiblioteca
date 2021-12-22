import { FormLivrosComponent } from './form-livros/form-livros.component';
import { ListaLivrosComponent } from './lista-livros/lista-livros.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
  {path: 'lista', component: ListaLivrosComponent},
  {path: 'add', component: FormLivrosComponent},
  {path: 'edit/:id', component: FormLivrosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
