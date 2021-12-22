import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from 'src/app/Livro';
import { LivroService } from 'src/services/livro.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.sass']
})
export class EditarComponent implements OnInit {

  livro: Livro = {
    id: 0,
    name: '',
    gender: '',
    author: '',
    photo: '',

  }

  constructor(private service: LivroService, private router: Router, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id_url = <any>this.ActivatedRoute.snapshot.params['id']
    console.log('id do URL:' + id_url)
    this.service.getID(id_url).subscribe({
      next: (resultado) => {
                              console.log(resultado)
                              this.livro = <any>resultado
      },
      error: (err) => { console.log(err)},
      complete: () => console.info('Livro Encontrado')
    })
  }

  modificar() {
    this.service.editForm(this.livro.id, this.livro).subscribe({
      next: (resultado) => {console.log('Livro Editado com Sucesso')},
    error: (err) => { console.log(err)},
    complete: () => console.info('Livro Encontrado')
    })

    this.router.navigate(['/lista'])
  }



}
