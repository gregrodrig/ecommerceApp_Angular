import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: ProductsComponent,
        // loadChildren: () =>
        //   import('./home/home.module').then((module) => module.HomeModule),
      },
      {
        path: 'productos',
        component: ProductsComponent,
      },
    ],
  },
  {
    path: 'contactos',
    component: ContactComponent,
  },
  {
    path: '**',
    component: ProductsComponent,
    // loadChildren: () =>
    //   import('./home/home.module').then((module) => module.HomeModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
