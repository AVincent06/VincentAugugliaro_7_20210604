/* modules */
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import { RouterModule, Routes } from '@angular/router';

/* components */
import { AppComponent } from './app.component';
import { CommentComponent } from './layout/comment/comment.component';
import { ContactsComponent } from './layout/contacts/contacts.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ForgotComponent } from './layout/auth/forgot/forgot.component';
import { FourOhFourComponent } from './layout/four-oh-four/four-oh-four.component';
import { HeaderNavComponent } from './layout/header-nav/header-nav.component';
import { NewsComponent } from './layout/news/news.component';
import { NotifComponent } from './layout/notif/notif.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { SigninComponent } from './layout/auth/signin/signin.component';
import { SignoutComponent } from './layout/auth/signout/signout.component';
import { SignupComponent } from './layout/auth/signup/signup.component';
import { SubmitComponent } from './layout/submit/submit.component';

/* directives */

/* services */
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CommentService } from './services/comment.service';
import { ProfileService } from './services/profile.service';

/* material */
import { LayoutModule } from '@angular/cdk/layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

const appRoutes: Routes = [
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuardService] },
  { path: 'forgot', component: ForgotComponent },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuardService] },
  { path: 'notif', component: NotifComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'signin', component: SigninComponent },
  { path: 'signout', component: SignoutComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'submit', component: SubmitComponent, canActivate: [AuthGuardService] },
  { path: '', component: NewsComponent, canActivate: [AuthGuardService] },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    ContactsComponent,
    FooterComponent,
    ForgotComponent,
    FourOhFourComponent,
    HeaderNavComponent,
    NewsComponent,
    NotifComponent,
    ProfileComponent,
    SigninComponent,
    SignoutComponent,
    SignupComponent,
    SubmitComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  providers: [
    AuthGuardService,
    AuthService,
    CommentService,
    ProfileService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline', floatLabel: 'always'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
