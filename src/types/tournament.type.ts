export interface ITournament{
    tnid?:string
    sport: string;
    title: string;
    season: string;
    from_date: Date| null;
    to_date: Date| null;
    end_date: Date| null;
    type: string;
    win_point: string;
    logo:string
}

export interface ICreateTournamentPayload {
    tnid?:string
    sport: string;
    title: string;
    season: string;
    from_date: Date| null;
    to_date: Date| null;
    end_date: Date| null;
    type: string;
    win_point: string;
    image: File|null;
}

export interface IUpdateTournamentPayload extends ICreateTournamentPayload {

}

