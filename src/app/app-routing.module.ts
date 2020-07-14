import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TetrisComponent } from './tetris/tetris.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tetris', component: TetrisComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
