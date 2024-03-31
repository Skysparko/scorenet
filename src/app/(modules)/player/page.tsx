"use client";
import PlayerList from "@/components/list/player-list";
import { useAppDispatch } from "@/store/hooks";
import { fetchPlayers, players as TD } from "@/store/slice/player-slice";
import { IPlayer } from "@/types/player.type";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const columns = [
  { name: "ID", uid: "pid" },
  { name: "Tournament ID", uid: "tnid" },
  { name: "NAME", uid: "name" },
  { name: "SNAME", uid: "s_name" },
  { name: "MOBILE", uid: "mobile" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "pid",
  "tnid",
  "name",
  "sname",
  "mobile",
  "status",
  "actions",
];

const Player = () => {
  const dispatch = useAppDispatch();
  const players = useSelector(TD);
  const fetchPlayerData = async () => {
    try {
      const data = await dispatch(fetchPlayers()).unwrap();
    } catch (error) {}
  };
  useEffect(() => {
    fetchPlayerData();
  }, []);
  return (
    <>
      {players && (
        <PlayerList
          columns={columns}
          data={players as IPlayer[]}
          INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
        />
      )}
    </>
  );
};

export default Player;
