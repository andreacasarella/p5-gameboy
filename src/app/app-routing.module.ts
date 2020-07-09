import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TetrisComponent } from './tetris/tetris.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: TetrisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
