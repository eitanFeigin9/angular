  import { bootstrapApplication } from '@angular/platform-browser';
  import { AppComponent } from './app/app.component';
  import { importProvidersFrom } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { FormsModule } from '@angular/forms';
  import { RouterModule, Routes } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http'; // <-- Add this import

  const routes: Routes = [
    { path: 'ip-list', loadComponent: () => import('./app/components/ip-list/ip-list.component').then(m => m.IpListComponent) },
    { path: 'country-details', loadComponent: () => import('./app/components/country-details/country-details.component').then(m => m.CountryDetailsComponent) },
    { path: '', redirectTo: '/ip-list', pathMatch: 'full' },
    { path: '**', redirectTo: '/ip-list' }
  ];
  
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
      ), provideAnimationsAsync(),
    ],
  }).catch((err) => console.error(err));
  