import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cheerleader } from 'src/app/model/cheerleader';
import { Team } from 'src/app/model/team';
import { TeamsService } from 'src/app/teams.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.page.html',
  styleUrls: ['./edit-team.page.scss'],
})
export class EditTeamPage implements OnInit {

  team: Team = {name: '', city: ''}
  //public team:Team|undefined;

  constructor(
    private teamService:TeamsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.teamService.getTeamById(+id).subscribe(
        {
          next:data=>{this.team = data},
          error:err=>{}
        }
      )
    }
  }

  async saveTeam() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null && this.team) {
      this.teamService.updateTeam(Number(id), this.team).subscribe({
        next:data=>{
          console.log(data);
        },
        error:err=>console.log(err)
      });
    } else if(this.team){
      this.teamService.addTeam(this.team).subscribe({
        next:data=>{
          console.log(data);
        }, 
        error:err=>console.log(err)
      });
    }
    this.router.navigateByUrl('/');
  }

}
