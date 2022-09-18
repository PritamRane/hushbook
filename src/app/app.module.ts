import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { CreateInterfaceComponent } from './adminControl/create/create-interface/create-interface.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainStoreComponent } from './main-store/main-store.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchToolBarComponent } from './search-tool-bar/search-tool-bar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { AdminPanelComponent } from './adminControl/create/create-book/admin-panel/admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ProfileComponent } from './profile/profile.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { OptionsComponent } from './adminControl/options/options.component';
import { UpdateInterfaceComponent } from './adminControl/update/update-interface/update-interface.component';
import { DeleteInterfaceComponent } from './adminControl/delete/delete-interface/delete-interface.component';
import { CreateUserComponent } from './adminControl/create/create-user/create-user.component';
import { HeaderComponent } from './adminControl/header/header.component';
import { UpdateUserComponent } from './adminControl/update/update-user/update-user.component';
import { DeleteUserComponent } from './adminControl/delete/delete-user/delete-user.component';
import { UpdateBookComponent } from './adminControl/update/update-book/update-book.component';
import { DeleteBookComponent } from './adminControl/delete/delete-book/delete-book.component';
import { FooterComponent } from './footer/footer.component';
import { CartSnackbarComponent } from './snack-bars/cart-snackbar/cart-snackbar.component';
import { FavSnackbarComponent } from './snack-bars/fav-snackbar/fav-snackbar.component';
import { SignUpSuccessfullyComponent } from './sign-up-successfully/sign-up-successfully.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwPaginationModule } from 'jw-angular-pagination';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainStoreComponent,
    SignUpComponent,
    SearchToolBarComponent,
    SearchResultComponent,
    AdminPanelComponent,
    DashboardComponent,
    FavoriteListComponent,
    CheckOutComponent,
    ProfileComponent,
    LoadingScreenComponent,
    OptionsComponent,
    CreateInterfaceComponent,
    UpdateInterfaceComponent,
    DeleteInterfaceComponent,
    CreateUserComponent,
    HeaderComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    UpdateBookComponent,
    DeleteBookComponent,
    FooterComponent,
    CartSnackbarComponent,
    FavSnackbarComponent,
    SignUpSuccessfullyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    ReactiveFormsModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    JwPaginationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
