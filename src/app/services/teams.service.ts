import { Injectable } from '@angular/core';
import { Team } from '../model/team';
import { Preferences } from '@capacitor/preferences';
import { Cheerleader } from '../model/cheerleader';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teams: Team[] = []
  teamCounter: number = 0
  cheerleaders: Cheerleader[] = []
  cheerleaderCounter: number = 0

  constructor() { 
    /*this.teams = [
      {
        id:0,
        name:"Miami Dolphins",
        city:"Miami",
        numMembers:10,
      },
      {
        id:1,
        name:"LA Lakers",
        city:"Los Angeles",
        numMembers:12,
      },
      {
        id:2,
        name:"Middleton Mad Dogs",
        city:"Middleton",
        numMembers:18,
      },
    ];*/
    this.getTeamsFromPreferences().then(
      data => this.teams = data
    );
    this.getTeamFromCounterPreferences().then(
      data => this.teamCounter = data
    );
    /*this.getCheerleadersFromPreferences().then(
      data => this.cheerleaders = data
    )
    this.getCheerleaderCounterFromPreferences().then(
      data => this.cheerleaderCounter = data
    )*/
  }

  public getTeams():Team[]{
    return this.teams;
  }

  public async getTeamsFromPreferences(): Promise<Team[]>{
    const ret = await Preferences.get({ key: 'teams' });
    if (ret.value != null) {
      return JSON.parse(ret.value) ? JSON.parse(ret.value):[];
    } else {
      return []
    };
  }

  public async getTeamFromCounterPreferences(): Promise<number>{
    const { value } = await Preferences.get({ key: 'teamCounter '})
    return value? +value:0
  }

  public getTeam(id:number|undefined): Team{
    return { ...this.teams.filter(t => t.id === id)[0] };
  }

  public saveTeam(t:Team):Promise<void> {
    var that = this;
    return new Promise<void>(async (resolve, reject)=>{
      if (t.id == undefined){
        t.id = this.teams[this.teams.length-1].id! +1;
        that.teams.push(t);
      } else { 
        let index = that.teams.findIndex(team=>team.id==t.id);
        if(index>=0)
          that.teams[index]=t;
      }
      that.saveTeams(that.teams).then(async (_) =>{
        that.saveTeamCounter(that.teamCounter)
          .then(_=>resolve())
          .catch(error=>reject(error));
      });
      
    });  
  }

  public saveTeams(teams:Team[]):Promise<void> {
    return Preferences.set({
      key: 'teams',
      value: JSON.stringify(teams)
    })
  }

  public saveTeamCounter(ct:number):Promise<void> {
    return Preferences.set({
      key: 'teamCounter',
      value: '' + ct
    })
  }

  public deleteTeam(id:number):Promise<void>{
    this.teams = this.teams.filter(t => t.id != id);
    return this.saveTeams(this.teams);
  }
  
  /*public getCheerleaders():Cheerleader[]{
    return this.cheerleaders;
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

  public saveCheerleader(c:Cheerleader):Promise<void>{
    var that = this;
    return new Promise<void>(async (resolve, reject)=>{
      if (c.id == undefined) {
        c.id = that.cheerleaderCounter++;
        that.cheerleaders.push(c);
      } else {
        that.deleteCheerleader(c.id);
        that.cheerleaders.push(c)
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
  }*/
  
}
