import { cache } from "react";
import { getSortedModsData } from "@/lib/mods";

export const getCachedModsData = cache(getSortedModsData);
