import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  @ViewChild('form') form;
  @ViewChild('submit') btn;

  formSignup: FormGroup;
  countries: any;
  address: Object;
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
      'address':              [null],
      'zipCode':              [null, Validators.compose([Validators.required, Validators.pattern('[0-9]{5}?[0-9]{3}')])],
      'streetName':           [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-ZÀ-ú ]+')])],
      'number':               [null, Validators.compose([Validators.required, Validators.pattern('[0-9]+')])],
      'complement':           [null],
      'neighbourhood':        [null],
      'country':              [null, Validators.compose([Validators.required])],
      'state':                [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-ZÀ-ú ]+')])],
      'city':                 [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-ZÀ-ú ]+')])],
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
    this.titleService.setTitle('Form');
  }

  
  getAddress(place:any) {       
    this.address = place['formatted_address'];
    var location = place['geometry']['location'];
    var lat =  location.lat();
    var lng = location.lng();
    console.log("Address Object", place);

    
    // this.formSignup.value.zipCode = 

    // console.log(this.formSignup.value);

    place.address_components.forEach(element => {
      if (element.types == 'postal_code') {
        this.form.zipCode = element.long_name
      } else if (element.types == 'route') {
      
      } else if(element.types == 'street_number'){

      } else if (element.types == 'country') {
      // } else if (element.types == '') {
      // } else if (element.types == '') {
      // } else if (element.types == '') {
      // } else if (element.types == '') {
      // } else if (element.types == '') {

      }
      // console.log(element.types)
    });

    console.log(this.form.zipCode)


    // Rua Heitor PEnteado, 1929
    
  }

  onSubmit() {
    this.body = JSON.stringify(this.formSignup.value);
    this.btn.nativeElement.innerHTML = 'Enviando ...';
    
    this.api.postData('http://', this.body)
      .subscribe(
        response => this.handleResponse(response),
        error => this.handleResponse(error)
      );
  }

  handleResponse(response) {
      console.log(response);
  }

}

