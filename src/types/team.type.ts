export interface ITeam{
    tmid?:string,
    tnid:string,
    name:string,
    s_name:string,
    group:string,
    tmatch:string,
    pmatch:string,
    win:string,
    lose:string,
    tie:string,
    rating:string,
    point:string,
    color:string
    logo:string
}

export interface ICreateTeamPayload  {
    tnid:string,
    name:string,
    s_name:string,
    group:string,
    tmatch:string,
    pmatch:string,
    win:string,
    lose:string,
    tie:string,
    rating:string,
    point:string,
    color:string
    image: File|null;
}

export interface IUpdateTeamPayload extends ICreateTeamPayload {

}

