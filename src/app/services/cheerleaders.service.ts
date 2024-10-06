import { Injectable } from '@angular/core';
import { Cheerleader } from '../model/cheerleader';
import { Preferences } from '@capacitor/preferences';
import { Team } from '../model/team';
import { TeamsService } from './teams.service';

@Injectable({
  providedIn: 'root'
})
export class CheerleadersService {

  teams: Team[] = []
  cheerleaders: Cheerleader[] = []
  cheerleaderCounter: number = 0

  constructor(
    public teamService: TeamsService
  ) { 
    /*this.cheerleaders = [
      {
        id:0,
        name:"Marcela Cruz",
        age:20,
      },
      {
        id:1,
        name:"Jessica Reyes",
        age:20,
      },
      {
        id:2,
        name:"Tracy Park",
        age:19,
      }
    ];*/
    this.getCheerleadersFromPreferences().then(
      data => this.cheerleaders = data
    )
    this.getCheerleaderCounterFromPreferences().then(
      data => this.cheerleaderCounter = data
    )
  }

  public getCheerleaders():Cheerleader[]{
    return this.cheerleaders;
  }

  public getCheerleadersByTeam(team:number|undefined):Cheerleader[]{
    return this.cheerleaders.filter(cheerleader=>cheerleader.teamID==team);
  }

  public async getCheerleadersFromPreferences(): Promise<Cheerleader[]>{
    const ret = await Preferences.get({ key: 'cheerleaders' })
    if (ret.value != null) {
      return JSON.parse(ret.value) ? JSON.parse(ret.value) : []
    } else {
      return []
    }
  }

  public async getCheerleaderCounterFromPreferences(): Promise<number>{
    const { value } = await Preferences.get({ key: 'cheerleaderCounter' })
    return value? +value:0
  }

  public getCheerleader(id:number): Cheerleader {
    return { ...this.cheerleaders.filter(c => c.id === id)[0] }
  }

  public getCheerleaderByTeam(teamID:number): Cheerleader{
    return {
      ...this.teams.filter(team => team.id === teamID)[0]
    }
  }

  public saveCheerleaderByTeam(c:Cheerleader, t:Team):Promise<void>{
    var that = this;
    return new Promise<void>(async (resolve, reject)=>{
      if (c.id == undefined) {
        /*if (t.members.length != undefined) {
          that.cheerleaderCounter = t.members.length
        }*/
        c.teamID = t.id;
        c.id = this.cheerleaders[this.cheerleaders.length-1].id! +1;//++that.cheerleaderCounter;
        that.cheerleaders.push(c);
        //t.members.push(c);
        //that.teamService.saveTeam(t);
      } else {
        /*that.deleteCheerleader(c.id);
        that.cheerleaders.push(c);*/
        let idx = that.cheerleaders.findIndex(cheerleader=>cheerleader.id==c.id);
        if(idx>=0){ 
          //t.members = [...t.members.slice(0,idx), c, ...t.members.slice(idx+1)];
          that.cheerleaders[idx]=c; 
        }
      }

      that.saveCheerleaders(that.cheerleaders).then(async (_) =>{
        that.saveCheerleaderCounter(that.cheerleaderCounter)
            .then(_=>resolve())
            .catch(error=>reject(error));
      })
    })
  }

  public saveCheerleaders(cheerleaders: Cheerleader[]):Promise<void> {
    return Preferences.set({
      key: 'cheerleaders',
      value: JSON.stringify(cheerleaders)
    })
  }

  public saveCheerleaderCounter(cc: number):Promise<void> {
    return Preferences.set({
      key: 'cheerleaderCounter',
      value: '' + cc
    })
  }

  public deleteCheerleader(id: number):Promise<void>{
    this.cheerleaders = this.cheerleaders.filter(c => c.id != id)
    return this.saveCheerleaders(this.cheerleaders);
  }
  
}
