import {NgModule} from '@angular/core';
import {PreloadAllModules, Route, RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {StudentGroupsPageComponent} from './student-groups-page/student-groups-page.component';
import {AuthGuard} from './shared/services/auth.guard';
import {StudentListPageComponent} from './student-list-page/student-list-page.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'groups', component: StudentGroupsPageComponent, canActivate: [AuthGuard]},
      {path: 'student-list', component: StudentListPageComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
