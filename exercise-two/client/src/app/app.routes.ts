import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
	{path: '', redirectTo: '/products', pathMatch: 'full'},
	{path: 'products', component: HomeComponent},
	{path: 'stock', component: HomeComponent},
	{path: 'nostock', component: HomeComponent},
	{path: '**', redirectTo: '/products', pathMatch: 'full'}
];

export const AppRoutes = RouterModule.forRoot(routes);
