import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Team } from './model/team';
import { environment } from 'src/environments/environment';
import { Cheerleader } from './model/cheerleader';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private httpClient:HttpClient
  ) { }


  getAll():Observable<Team[]>{
    return this.httpClient.get<Team[]>(environment.apiUrl+"/teams").pipe(map(dataArray=>{
      return dataArray.map(data=>{
        return {
          id: data.id,
          name: data.name,
          city: data.city
        };
      })
    }));
  }

  getTeamById(id:number):Observable<Team>{
    return this.httpClient.get<Team>(environment.apiUrl+"/teams/"+id).pipe(map(data=>{
      return {
        id:data.id,
        name:data.name,
        city:data.city
      }
    }))
  }

  addTeam(team:Team):Observable<Team>{
    return this.httpClient.post<Team>(environment.apiUrl+"/teams", team).pipe(map(data=>{
      return {
        id:data.id,
        name:data.name,
        city:data.city
      }
    }));
  }

  updateTeam(id:number, team:Team):Observable<Team>{
    return this.httpClient.put<Team>(environment.apiUrl+"/teams/"+id, team).pipe(map(data=>{
      return {
        id:data.id,
        name:data.name,
        city:data.city
      }
    }));
  }

  deleteTeam(id:number):Observable<Team>{
    return this.httpClient.delete<Team>(environment.apiUrl+"/teams/"+id).pipe(map(data=>{
      return {
        id:data.id,
        name:data.name,
        city:data.city
      }
    }));
  }

  getCheerLeaders(teamId:number):Observable<Cheerleader[]>{
    return this.httpClient.get<Cheerleader[]>(environment.apiUrl+"/cheerleaders?teamID="+teamId).pipe(map(dataArray=>{
      return dataArray.map(data=>{
        return {
          id: data.id,
          name: data.name,
          age: data.age,
          teamID: data.teamID
        }
      })
    }))
  }

}
