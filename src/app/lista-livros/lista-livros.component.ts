import { Component, OnInit } from '@angular/core';
import { LivroService } from 'src/services/livro.service';
import { Livro } from 'src/app/Livro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.sass']
})
export class ListaLivrosComponent implements OnInit {

  livros!: Livro[];

  constructor( private service: LivroService, private router: Router) { }

  isModal: boolean = false;
  idLivroParaExcluir!: any

  ngOnInit(): void {
    this.listarLivros()
  }

  listarLivros(){
    this.service.listar().subscribe(resultado => {
      console.log(resultado)
      this.livros = resultado
    })
  }

  confirmarAcao(){
    this.service.deletar(this.idLivroParaExcluir).subscribe( {
      next:(resultado) => {console.log(resultado)
      this.listarLivros()},
      error:(erro) => console.log(erro),
      complete: () => {console.log('complete'), this.isModal = false}
    })
  }

  editar(id:any){
    this.router.navigate(['edit/'+ id])
  }

  mostrarModal(id:any){
    this.isModal = true
    this.idLivroParaExcluir = id
  }

}
