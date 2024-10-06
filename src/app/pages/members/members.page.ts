import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheerleadersService } from 'src/app/cheerleaders.service';
import { AlertController } from '@ionic/angular';
import { Cheerleader } from 'src/app/model/cheerleader';
import { Team } from 'src/app/model/team';
import { TeamsService } from 'src/app/teams.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  public team:Team|undefined;
  public cheerleaders: Observable<Cheerleader[]> | undefined
  
  constructor(
    public teamService: TeamsService,
    public cheerleaderService: CheerleadersService,
    private router: Router,
    private alertController: AlertController,
    private route:ActivatedRoute
  ) { }

  getTeamName(t: Team){}

  goEditCheerleader(tid:number | undefined, id: number | undefined){
    if (id == undefined) {
      this.router.navigateByUrl(`/edit-cheerleader/${id != undefined ? id:'null'}/${tid}`)
    } else {
      this.router.navigateByUrl(`/edit-cheerleader/${id}/${tid}`)
    }
  }
  
  deleteCheerleader(id: number):Observable<Cheerleader>{
    return this.cheerleaderService.deleteCheerleader(id);
  }

  async presentAlertConfirm(c: Cheerleader){
    console.log('alerta');
    const alert = await this.alertController.create({
      header: 'Quitar animadora',
      message: `¿Estás seguro que quieres quitar ${c.name}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Aceptar', handler: () => {
          if (c && c.id) {
            this.deleteCheerleader(c.id).subscribe({
              next:data=>{
                this.refresh(this.team);
              },
              error:err=>{
                console.log(err)
              }
            });
          }
        }}
      ]
    });
    await alert.present();
  }

  refresh(team:Team | undefined){
    if(team && team.id)
      this.cheerleaders = this.cheerleaderService.getCheerleadersByTeam(team.id);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{

      //let id = params.get('id');
      let teamID = params.get('id');
      this.teamService.getTeamById(Number(teamID)).subscribe(
      {
        next:data=>{
          this.team = data;
          this.refresh(this.team);
        },
        error:err=>{},
      }
    );
    });
    
  }

}
