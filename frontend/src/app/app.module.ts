/* modules */
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

/* components */
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SigninComponent } from './layout/signin/signin.component';
import { SignupComponent } from './layout/signup/signup.component';
import { NewsComponent } from './layout/news/news.component';
import { ContactsComponent } from './layout/contacts/contacts.component';
import { SubmitComponent } from './layout/submit/submit.component';

/* material */
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderNavComponent } from './layout/header-nav/header-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

const appRoutes: Routes = [
  { path: 'contacts', component: ContactsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'submit', component: SubmitComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
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
    HeaderNavComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
