import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'form', component: FormComponent },
    // { path: 'pagina-nao-encontrada', component: ErroComponent },
    // { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
