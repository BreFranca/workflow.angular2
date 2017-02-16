import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.sass']
})
export class SignupComponent implements OnInit {

  @ViewChild('submit') btn;

  formSignup: FormGroup;
  countries: any;
  body: any;

  constructor(
    public titleService: Title,
    fb: FormBuilder,
    private api: ApiService
  ) { 
    this.formSignup = fb.group({

      'email':                [null, Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      'password':             [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-ZÀ-ú]+')])],
      'passwordConfirmation': [null, Validators.compose([Validators.required])],
      'fullName':             [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ú ]+')])],
      'birthDate':            [null, Validators.compose([Validators.required, Validators.pattern('(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))')])],
      'zipCode':              [null, Validators.compose([Validators.required, Validators.pattern('[0-9]{5}?[0-9]{3}')])],
      'streetName':           [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-ZÀ-ú ]+')])],
      'number':               [null, Validators.compose([Validators.required, Validators.pattern('[0-9]+')])],
      'complement':           [null],
      'neighbourhood':        [null],
      'country':              [null, Validators.compose([Validators.required])],
      'state':                [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-ZÀ-ú ]+')])],
      'city':                 [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-ZÀ-ú ]+')])],


      // 'email':                ['vagas.tl@improving.com.br', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      // 'password':             ['minhaSenha', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZÀ-ú]+')])],
      // 'passwordConfirmation': ['minhaSenha', Validators.compose([Validators.required])],
      // 'fullName':             ['Fulano de Tal', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ú ]+')])],
      // 'birthDate':            ['05/11/1982', Validators.compose([Validators.required, Validators.pattern('(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))')])],
      // 'zipCode':              ['12345678', Validators.compose([Validators.required, Validators.pattern('[0-9]{5}?[0-9]{3}')])],
      // 'streetName':           ['Rua Ipiranga', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZÀ-ú ]+')])],
      // 'number':               ['1000', Validators.compose([Validators.required, Validators.pattern('[0-9]+')])],
      // 'complement':           ['conjunto 23'],
      // 'neighbourhood':        ['Centro'],
      // 'country':              ['BR', Validators.compose([Validators.required])],
      // 'state':                ['São Paulo', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZÀ-ú ]+')])],
      // 'city':                 ['São Paulo', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZÀ-ú ]+')])],


    })

    this.countries = [
      { value: 'AR', text: 'Argentina' },
      { value: 'BR', text: 'Brasil' },
      { value: 'CL', text: 'Chile' },
      { value: 'CO', text: 'Colômbia' },
      { value: 'CR', text: 'Costa Rica' },
      { value: 'CU', text: 'Cuba' },
      { value: 'DO', text: 'República Dominicana' },
      { value: 'EC', text: 'Equador' },
      { value: 'FR', text: 'França' },
      { value: 'GF', text: 'Guiana Francesa' },
      { value: 'GT', text: 'Guatemala' },
      { value: 'HN', text: 'Honduras' },
      { value: 'HT', text: 'Haiti' },
      { value: 'IT', text: 'Itália' },
      { value: 'JM', text: 'Jamaica' },
      { value: 'MX', text: 'México' },
      { value: 'NI', text: 'Nicarágua' },
      { value: 'PA', text: 'Panamá' },
      { value: 'PE', text: 'Peru' },
      { value: 'PR', text: 'Porto Rico' },
      { value: 'PY', text: 'Paraguai' },
      { value: 'SV', text: 'El Salvador' },
      { value: 'US', text: 'Estados Unidos' },
      { value: 'UY', text: 'Uruguai' },
      { value: 'VE', text: 'Venezuela' }
    ];
  }

  ngOnInit() {
    // title
    this.titleService.setTitle('Sign up');
  }

  onSubmit() {
    // this.btn.nativeElement.innerHTML = 'Enviando ...';
    this.body = JSON.stringify(this.formSignup.value);

    this.api.postData('http://www.improving.com.br/api/test/users', this.body)
      .subscribe(
        response => this.handleResponse(response),
        error => this.handleResponse(error)
      );
  }

  handleResponse(response) {
      console.log(response);
      // if (response.status === 'success') {
      //   this.response = 'success';
      //   this.resIcon = this.rootApi + '/img/happy.png';
      //   this.resText = 'O envio foi realizado com sucesso. <br>Obrigado pela mensagem, aguarde que em breve <br>entrarei em contato.';
      // }

      // if (response.status === 'error') {
      //   this.response = 'error';
      //   this.resIcon = this.rootApi + '/img/sad.png';
      //   this.resText = 'Houve algum problema que impediu <br>o envio de sua mensagem.';
      // }
    }


}
