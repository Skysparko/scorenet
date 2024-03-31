"use client";
import TournamentList from "@/components/list/tournament-list";
import { useAppDispatch } from "@/store/hooks";
import {
  fetchTournaments,
  tournaments as TD,
} from "@/store/slice/tournament-slice";
import { tokens as TK } from "@/store/slice/auth-slice";

import { ITournament } from "@/types/tournament.type";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const columns = [
  { name: "ID", uid: "tnid" },
  { name: "SPORT", uid: "sport" },
  { name: "TITLE", uid: "title" },
  { name: "SEASON", uid: "season" },
  { name: "FROM_DATE", uid: "from_date" },
  { name: "TO_DATE", uid: "to_date" },
  { name: "END_DATE", uid: "end_date" },
  { name: "TYPE", uid: "type" },
  { name: "WIN_POINT", uid: "win_point" },
  { name: "ACTIONS", uid: "actions" },

];

const INITIAL_VISIBLE_COLUMNS = [
  "tnid",
  "sport",
  "title",
  "season",
  "from_date",
  "to_date",
  "end_date",
  "type",
  "win_point",
  "actions"
];

const Tournament = () => {
  const dispatch = useAppDispatch();
  const tournaments = useSelector(TD);
  const token = useSelector(TK)
  const fetchTournamentData = async () => {
    try {
      const headers = {
        Authorization:  `Bearer ${token}`
      }
      const data = await dispatch(fetchTournaments(headers)).unwrap();
    } catch (error) {}
  };
  useEffect(() => {
    fetchTournamentData();
  }, []);
  return (
    <>
      {tournaments && (
        <TournamentList
          columns={columns}
          data={tournaments as ITournament[]}
          INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
        />
      )}
    </>
  );
};

export default Tournament;
