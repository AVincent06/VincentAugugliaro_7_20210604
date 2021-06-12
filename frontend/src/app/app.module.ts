/* modules */
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

/* components */
import { AppComponent } from './app.component';
import { ContactsComponent } from './layout/contacts/contacts.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderNavComponent } from './layout/header-nav/header-nav.component';
import { NewsComponent } from './layout/news/news.component';
import { NotifComponent } from './layout/notif/notif.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { SigninComponent } from './layout/auth/signin/signin.component';
import { SignupComponent } from './layout/auth/signup/signup.component';
import { SubmitComponent } from './layout/submit/submit.component';

/* services */
import { AuthService } from './services/auth.service';

/* material */
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

const appRoutes: Routes = [
  { path: 'contacts', component: ContactsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'notif', component: NotifComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'submit', component: SubmitComponent },
  { path: '', component: NewsComponent },
  //{ path: 'not-found', component: FourOhFourComponent },
  //{ path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    NewsComponent,
    ContactsComponent,
    SubmitComponent,
    HeaderNavComponent,
    ProfileComponent,
    NotifComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline', floatLabel: 'always'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
