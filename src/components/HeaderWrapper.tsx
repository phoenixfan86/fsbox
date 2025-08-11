import { getSortedModsData, getAllGames } from "@/lib/mods";
import Header from "./Header";

export default function HeaderWrapper() {

  const allMods = getSortedModsData();
  const games = getAllGames();

  return <Header allMods={allMods} games={games} />;
}
