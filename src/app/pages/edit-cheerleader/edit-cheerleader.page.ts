import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cheerleader } from 'src/app/model/cheerleader';
import { Team } from 'src/app/model/team';
import { CheerleadersService } from 'src/app/cheerleaders.service';
import { TeamsService } from 'src/app/teams.service';

@Component({
  selector: 'app-edit-cheerleader',
  templateUrl: './edit-cheerleader.page.html',
  styleUrls: ['./edit-cheerleader.page.scss'],
})
export class EditCheerleaderPage implements OnInit {

  cheerleader: Cheerleader = {name: '', age: undefined, teamID: undefined}
  team: Team = {name:'', city: ''/*, members:[this.cheerleader]*/}
  /*public team:Team|undefined;
  public cheerleader:Cheerleader|undefined*/

  constructor(
    private cheerleaderService: CheerleadersService,
    private teamService: TeamsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location:Location
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const teamID = this.activatedRoute.snapshot.paramMap.get('tid');
    if (id) {
      this.cheerleaderService.getCheerLeaderById(+id).subscribe(
        {
          next:data=>{this.cheerleader = data},
          error:err=>{}
        }
      );
    }
    if(teamID){
      this.teamService.getTeamById(+teamID).subscribe(
        {
          next:data=>{this.team = data},
          error:err=>{}
        }
      );
    }
  }

  saveCheerleader(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != 'null' && this.cheerleader) {
      this.cheerleaderService.updateCheerleader(Number(id), this.cheerleader).subscribe({
        next:data=>{
          console.log(data);
        },
        error:err=>console.log(err)
      })
    } else if (this.cheerleader) {
      this.cheerleader.teamID = this.team.id;
      this.cheerleaderService.addCheerleader(this.cheerleader).subscribe({
        next:data=>{
          console.log(data);
        },
        error:err=>console.log(err)
      })
    }
    //if (this.team) {
      this.router.navigateByUrl('/members/'+this.team.id)
    //}
  }

}
