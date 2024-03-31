export interface IPlayer{
    tmid?:string
    sport: string;
    title: string;
    season: string;
    from_date: Date;
    to_date: Date;
    end_date: Date;
    type: string;
    win_point: string;
    image: File | null;
}

export interface ICreatePlayerPayload extends IPlayer {

}

export interface IUpdatePlayerPayload extends IPlayer {

}

