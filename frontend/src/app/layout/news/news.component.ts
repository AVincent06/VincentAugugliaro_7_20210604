import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FeelingService } from 'src/app/services/feeling.service';
import { MessageService } from 'src/app/services/message.service';
import { ConfirmationComponent } from '../shared/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  profileId!: number;
  isAdmin!: boolean;
  messages: any[] = [];
  nbNews: number = 5; // nombre par défaut

  constructor(
    private authService : AuthService,
    private dialog: MatDialog,
    private feelingService : FeelingService,
    private messagesService: MessageService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profileId = this.authService.getProfileId();
    this.isAdmin = this.authService.getIsAdmin();

    this.messagesService.getNewsByAmount(this.nbNews).subscribe((data: any) => {
      this.messages = data;
    });
  }

  
  onDislike(index: number) {
    if( this.isOneOfThem(this.messages[index].usersDisliked) ) {
      this.messages[index].usersDisliked?.splice(index, 1);                  // Si le dislike est déjà coché, on le décoche
    } else {
      this.messages[index].usersDisliked?.push(this.profileId);              // Si le dislike n'est pas coché, on le coche
    }
    this.messages[index].dislikes = this.messages[index].usersDisliked?.length; // Correction du total des likes
    
    this.messagesService.saveSingleMessage(this.messages[index].id);
  }
  
  
  onShow(index: number) {
    let myElement = document.getElementById("comments-" + index);
    if(myElement!.style.display === "none") {
      myElement!.style.display = "block";
    } else {
      myElement!.style.display = "none";
    }
  }
  
  onViewMessage(id: number) {
    // this.router.navigate(['/message', 'view', id]) créer le component de vue unique ou rediriger vers message?
  }
  
  updateMessageComments(index: number) {
    //this.messages[index].comments!++; // POUR TEST, FAUX POUR LES SUPPRESSIONS, RENVOI UN NOMBRE VERIFIE EN BDD
  }
  
  /* -----------------en accord avec le BACK à partir d'ici ----------------------------*/
  
  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent,{
      data:{
        message: 'Etes-vous sûr de vouloir supprimer ce message?',
        buttonText: {
          ok: 'Supprimer',
          cancel: 'Annuler'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Effacer le message après confirmation
        this.messagesService.delMessage(id).subscribe(() => {
          console.log("Le message a été supprimé!");
          
          // Raffraichissement des news après suppression
          this.messagesService.getNewsByAmount(this.nbNews).subscribe((data: any) => {
            this.messages = data;
          });
        });
      }
    });  
  }
  
  /* utiliser comme isLikedBy ou isDislikedBy */
  isOneOfThem(list?: number[]): boolean {
    if( list?.find(id => id === this.profileId) ) return true;
    return false;
  }

  onLike(index: number) {
    if( this.isOneOfThem(this.messages[index].usersLiked) ) {

      // Si le like est déjà coché, on le décoche
      this.messages[index].usersLiked?.splice(index, 1);

    } else {

      // Si le like n'est pas coché, on le coche
      this.feelingService.addLike(this.messages[index].id, this.profileId).subscribe(() => {
        //this.messages[index].usersLiked?.push(this.profileId);
        const element = document.getElementById("likes-"+index);
        element!.innerHTML = (parseInt(element!.innerHTML, 10) + 1).toString() ; // on ajoute 1
        document.getElementById("up-"+index)!.innerHTML = 'thumb_up_alt'; // mise à jour de l'icone
      });

    }

    // Correction du total des likes
    this.messages[index].likes = this.messages[index].usersLiked?.length;
    
    this.messagesService.saveSingleMessage(this.messages[index].id);
  }
  
}