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
  @ViewChild('selectCountry') selectCountry;

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
      // 'birthDate':            [null, Validators.compose([Validators.required, Validators.pattern('[0-3]{1}[0-9]{1}/[0-1]{1}[0-9]{1}/[0-2]{1}[0-9]{1}[0-9]{1}[0-9]{1}')])],
      'birthDate':            [null, Validators.compose([Validators.required, Validators.pattern('[0-2]{1}[0-9]{1}[0-9]{1}[0-9]{1}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}')])],
      'address':              [null],
      'zipCode':              [null, Validators.compose([Validators.required, Validators.pattern('[0-9]{5}-?[0-9]{3}')])],
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
    // this.address = place['formatted_address'];
    // var location = place['geometry']['location'];
    // var lat =  location.lat();
    // var lng = location.lng();
    // console.log("Address Object", place);
    place.address_components.forEach(element => {
      if (element.types.indexOf('postal_code') > -1) {
        this.formSignup.controls['zipCode'].patchValue(element.long_name);
      } else if (element.types.indexOf('route') > -1) {
        this.formSignup.controls['streetName'].patchValue(element.long_name);
      } else if (element.types.indexOf('street_number') > -1){
        this.formSignup.controls['number'].patchValue(element.long_name);        
      } else if (element.types.indexOf('country') > -1) {
        this.formSignup.controls['country'].patchValue(element.short_name);                
      } else if (element.types.indexOf('sublocality') > -1) {
        this.formSignup.controls['neighbourhood'].patchValue(element.long_name); 
      } else if (element.types.indexOf('administrative_area_level_1') > -1) {
        this.formSignup.controls['state'].patchValue(element.short_name);         
      } else if (element.types.indexOf('administrative_area_level_2') > -1) {
        this.formSignup.controls['city'].patchValue(element.long_name);
      }
    })
  }

  onSubmit() {
    // this.btn.nativeElement.innerHTML = 'Enviando ...';

    // date format
    let d = this.formSignup.value['birthDate'].substring(8, 10);
    let m = this.formSignup.value['birthDate'].substring(5, 7);
    let y = this.formSignup.value['birthDate'].substring(0, 4);
    this.formSignup.value['birthDate'] = d + '/' + m + '/' + y;

    delete this.formSignup.value['address'];
    delete this.formSignup.value['passwordConfirmation'];

    this.body = JSON.stringify(this.formSignup.value);
    console.log(this.body);
    
    // this.api.postData('http://', this.body)
    //   .subscribe(
    //     response => this.handleResponse(response),
    //     error => this.handleResponse(error)
    //   );
  }

  handleResponse(response) {
      console.log(response);
  }

}

