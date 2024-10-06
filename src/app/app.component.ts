import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TeamsService } from './teams.service';
import { Team } from './model/team';
import { CheerleadersService } from './cheerleaders.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    teamSvc:TeamsService,
    cheerleadersvc: CheerleadersService
  ) { 
    
    /*teamSvc.getAll().subscribe({
      next:teams=>{
        console.log(teams);
      },
      error:err=>{
        console.log(err);
      }
    });*/

    teamSvc.getTeamById(2).subscribe({
      next:team=>{
        console.log(team);
      },
      error:err=>{
        console.log(err);
      }
    });

    /*teamSvc.addTeam({name:"Equipo 6", city:"Sevilla"}).subscribe({
      next:team=>{
        console.log(team);
      },
      error:err=>{
        console.log(err);
      }
    });

    teamSvc.updateTeam("2", {id:2, name:"Equipo 2", city:"Middleton"}).subscribe({
      next:team=>{
        console.log(team);
      },
      error:err=>{
        console.log(err);
      }
    });

    teamSvc.deleteTeam("b456").subscribe({
      next:team=>{
        console.log(team);
      },
      error:err=>{
        console.log(err);
      }
    });

    teamSvc.getCheerLeaders("1").subscribe({
      next:cheerleaders=>{
        console.log(cheerleaders);
      },
      error:err=>{
        console.log(err);
      }
    });

    cheerleadersvc.getAll().subscribe({
      next:cheerleaders=>{
        console.log(cheerleaders)
      },
      error:err=>{
        console.log(err);
      }
    })

    cheerleadersvc.getCheerleadersByTeam(1).subscribe({
      next:cheerleaders=>{
        console.log(cheerleaders)
      },
      error:err=>{
        console.log(err);
      }
    })

    cheerleadersvc.getCheerLeaderById(2).subscribe({
      next:cheerleader=>{
        console.log(cheerleader)
      },
      error:err=>{
        console.log(err);
      }
    })

    cheerleadersvc.addCheerleader({name:"Tara King", age:18, teamID:2}).subscribe({
      next:cheerleader=>{
        console.log(cheerleader)
      },
      error:err=>{
        console.log(err);
      }
    })

    cheerleadersvc.updateCheerleader(3, {name:"Victoria Cheng", age:19, teamID:1}).subscribe({
      next:cheerleader=>{
        console.log(cheerleader)
      },
      error:err=>{
        console.log(err);
      }
    })

    cheerleadersvc.deleteCheerleader(5).subscribe({
      next:cheerleader=>{
        console.log(cheerleader)
      },
      error:err=>{
        console.log(err);
      }
    })*/
    
  }
}
