import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Cheerleader } from './model/cheerleader';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheerleadersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll():Observable<Cheerleader[]>{
    return this.httpClient.get<Cheerleader[]>(environment.apiUrl+"/cheerleaders").pipe(map(dataArray=>{
      return dataArray.map(data=>{
        return {
          id: data.id,
          name: data.name,
          age: data.age,
          teamID: data.teamID
        };
      })
    }));
  }

  getCheerleadersByTeam(teamID:number):Observable<Cheerleader[]>{
    return this.httpClient.get<Cheerleader[]>(environment.apiUrl+"/cheerleaders?teamID="+teamID).pipe(map(dataArray=>{
      return dataArray.map(data=>{
        return {
          id: data.id,
          name: data.name,
          age: data.age,
          teamID: data.teamID
        }
      })
    }));
  }

  getCheerLeaderById(id:number):Observable<Cheerleader>{
    return this.httpClient.get<Cheerleader>(environment.apiUrl+"/cheerleaders/"+id).pipe(map(data=>{
      return {
        id:data.id,
        name:data.name,
        age:data.age,
        teamID:data.teamID
      }
    }))
  }

  addCheerleader(cheerleader:Cheerleader):Observable<Cheerleader>{
    return this.httpClient.post<Cheerleader>(environment.apiUrl+"/cheerleaders", cheerleader).pipe(map(data=>{
      return {
        id:data.id,
        name:data.name,
        age:data.age,
        teamID:data.teamID
      }
    }))
  }

  updateCheerleader(id:number, cheerleader:Cheerleader):Observable<Cheerleader>{
    return this.httpClient.put<Cheerleader>(environment.apiUrl+"/cheerleaders/"+id, cheerleader).pipe(map(data=>{
      return {
        id:data.id,
        name:data.name,
        age:data.age,
        teamID:data.teamID
      }
    }))
  }

  deleteCheerleader(id:number):Observable<Cheerleader>{
    return this.httpClient.delete<Cheerleader>(environment.apiUrl+"/cheerleaders/"+id).pipe(map(data=>{
      return {
        id:data.id,
        name:data.name,
        age:data.age,
        teamID:data.teamID
      }
    }))
  }
}
