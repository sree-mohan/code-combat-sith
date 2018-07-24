import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Components
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'landing', component: LandingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
