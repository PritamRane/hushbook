import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './adminControl/create/create-book/admin-panel/admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainStoreComponent } from './main-store/main-store.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchToolBarComponent } from './search-tool-bar/search-tool-bar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { ProfileComponent } from './profile/profile.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { OptionsComponent } from './adminControl/options/options.component';
import { CreateInterfaceComponent } from './adminControl/create/create-interface/create-interface.component';
import { UpdateInterfaceComponent } from './adminControl/update/update-interface/update-interface.component';
import { DeleteInterfaceComponent } from './adminControl/delete/delete-interface/delete-interface.component';
import { CreateUserComponent } from './adminControl/create/create-user/create-user.component';
import { HeaderComponent } from './adminControl/header/header.component';
import { UpdateUserComponent } from './adminControl/update/update-user/update-user.component';
import { DeleteUserComponent } from './adminControl/delete/delete-user/delete-user.component';
import { UpdateBookComponent } from './adminControl/update/update-book/update-book.component';
import { DeleteBookComponent } from './adminControl/delete/delete-book/delete-book.component';
import { SignUpSuccessfullyComponent } from './sign-up-successfully/sign-up-successfully.component';


const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'mainstore',
    component: MainStoreComponent,
  },
  { path: 'fav', component: FavoriteListComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin/options', component: OptionsComponent },
  { path: 'admin/options/create', component: CreateInterfaceComponent },
  { path: 'admin/options/update', component: UpdateInterfaceComponent },
  { path: 'admin/options/delete', component: DeleteInterfaceComponent },
  { path: 'admin/options/create/createuser', component: CreateUserComponent },
  { path: 'admin/options/update/updateuser', component: UpdateUserComponent },
  { path: 'admin/options/delete/deleteuser', component: DeleteUserComponent },
  { path: 'admin/options/update/updatebook', component: UpdateBookComponent },
  { path: 'admin/options/delete/deletebook', component: DeleteBookComponent },
  {
    path: 'signup/signupSuccessfully',
    component: SignUpSuccessfullyComponent,
  },
  {
    path: 'searchresult',
    component: SearchResultComponent,
    canActivate: [AuthGuard],
  },
  { path: 'redirecting', component: LoadingScreenComponent },
  { path: 'admin/options/create/createbook', component: AdminPanelComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
