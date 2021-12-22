import { Component, OnInit } from '@angular/core';
import { LivroService } from 'src/services/livro.service';
import { Livro } from 'src/app/Livro';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-livros',
  templateUrl: './form-livros.component.html',
  styleUrls: ['./form-livros.component.sass']
})
export class FormLivrosComponent implements OnInit {

  verificarStatus: boolean = true

  form!: FormGroup

  livro: Livro = {
    id: 0,
    name: '',
    gender: '',
    author: '',
    photo: '',

  }

  constructor(private router: Router, private service: LivroService, private ActivatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {

    const id_url = <any>this.ActivatedRoute.snapshot.params['id']
    console.log('id do URL:' + id_url)
    this.service.getID(id_url).subscribe({
      next: (resultado) => {
                              console.log(resultado),
                              this.livro = <any>resultado,
                              this.updateForm(this.livro)
                              this.verificarStatus = false
      },
      error: (err) => { console.log(err)},
      complete: () => console.info('Livro Encontrado')
    })

    this.form = this.fb.group({
      id: [null],
      name: [null],
      gender: [null],
      author: [null],
      photo: [null],
    })

  }

  adicionar() {
    this.service.add(this.livro).subscribe({
      next: (resultado) => { console.log('cadastro realizado com sucesso')
      },
      error:(erro) => console.log(erro),
      complete: () => {console.log('completo')}
    })

    this.router.navigate(['/lista'])
  }

  modificar(){
    if(this.form.value.id){
      //vamos editar o form-livros
      this.service.editForm(this.form.value.id, this.form.value).subscribe({
        next: (resultado) => console.log('Livro Editado com Sucesso'),
        error: (err) => console.error(err),
        complete: () => {console.info('Edição Completada com êxito'), this.router.navigate(['/lista']) }
      })
    } else {
      //vamos cadastrar o form-livros
      this.service.add(this.form.value).subscribe({
        next: (resultado) => console.log('Livro Cadastrado com Sucesso'),
        error: (err) => console.error(err),
        complete: () => {console.info('Cadastrado Completado com êxito'), this.router.navigate(['/lista']) }
      })
    }
  }

  updateForm(livro:any){
    this.form.patchValue({
      id:livro.id,
      name: livro.name,
      author: livro.author,
      gender: livro.gender,
      photo: livro.photo
    })
  }

}
