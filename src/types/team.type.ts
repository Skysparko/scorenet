export interface ITeam{
    tnid?:string,
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
    logo: File | null;
}

export interface ICreateTeamPayload extends ITeam {

}

export interface IUpdateTeamPayload extends ITeam {

}

