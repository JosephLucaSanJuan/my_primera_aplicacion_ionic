import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Team } from '../model/team';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public teams: Observable<Team[]> | undefined;
  constructor(
    public teamService:TeamsService,
    private router:Router,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.teams = this.teamService.getAll();
  }

  refresh(){
    this.teams = this.teamService.getAll();
  }
  
  seeTeam(id:number|undefined){
    this.router.navigateByUrl('members/'+id)//`/members${id != undefined ? '/' +id : ''}`)
  }

  goEditTeam(id?: number|undefined){
    this.router.navigateByUrl(`/edit-team${id != undefined ? '/' +id : ''}`);
  }

  deleteTeam(id:number):Observable<Team>{
    return this.teamService.deleteTeam(id);
  }

  async presentAlertConfirm(t:Team){
    console.log('alerta');
    const alert = await this.alertController.create({
      header: 'Quitar equipo',
      message: `¿Estás seguro que quieres quitar el equipo <strong>${t.name}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Aceptar',
          handler: () => {
            if (t && t.id) {
              this.deleteTeam(t.id).subscribe({
                next:data=>{
                  this.refresh()
                },
                error:err=>{
                  console.log(err)
                }
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
