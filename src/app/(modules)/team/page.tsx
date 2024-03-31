"use client";
import TeamList from "@/components/list/team-list";
import { useAppDispatch } from "@/store/hooks";
import { fetchTeams, teams as TD } from "@/store/slice/team-slice";
import { tokens as TK } from "@/store/slice/auth-slice";
import { ITeam } from "@/types/team.type";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const columns = [
  { name: "ID", uid: "tmid" },
  { name: "Tournament ID", uid: "tnid" },
  { name: "TITLE", uid: "name" },
  { name: "SNAME", uid: "s_name" },
  { name: "GROUP", uid: "group" },
  { name: "TMATCH", uid: "tmatch" },
  { name: "PMATCH", uid: "pmatch" },
  { name: "WIN", uid: "win" },
  { name: "LOSE", uid: "lose" },
  { name: "TIE", uid: "tie" },
  { name: "RATING", uid: "rating" },
  { name: "POINT", uid: "point" },
  { name: "COLOR", uid: "color" },
  // { name: "LOGO", uid: "logo" },
  { name: "ACTIONS", uid: "actions" },


];

const INITIAL_VISIBLE_COLUMNS = [
  "tmid",
  "tnid",
  "name",
  "s_name",
  "group",
  "tmatch",
  "pmatch",
  "win",
  "lose",
  "tie",
  "rating",
  "point",
  "color",
  "actions",
];

const Team = () => {
  const dispatch = useAppDispatch();
  const teams = useSelector(TD);
  const token = useSelector(TK)
  const fetchTeamData = async () => {
    try {
      const headers = {
        Authorization:  `Bearer ${token}`
      }
      const data = await dispatch(fetchTeams(headers)).unwrap();
    } catch (error) {}
  };
  useEffect(() => {
    fetchTeamData();
  }, []);
  return (
    <>
      {teams && (
        <TeamList
          columns={columns}
          data={teams as ITeam[]}
          INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
        />
      )}
    </>
  );
};

export default Team;
