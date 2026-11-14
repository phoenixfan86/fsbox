export type GameSeo = {
  displayName: string;
  title: string;
  description: string;
  h1: string;
  keywords: string[];
};

export const gameSeo: Record<string, GameSeo> = {
  minecraft: {
    displayName: "Minecraft",
    title: "Моди на Minecraft безкоштовно: скачати збірки | FSBox",
    description:
      "Моди на Minecraft безкоштовно: шейдери, техніка, зброя та магія. Збірки для Forge і Fabric, версії 1.12.2, 1.16.5, 1.20.1. Описи українською.",
    h1: "Моди на Minecraft: завантажити безкоштовно",
    keywords: ["моди на майнкрафт", "скачати моди на майнкрафт", "minecraft mods"],
  },
  "stardew-valley": {
    displayName: "Stardew Valley",
    title: "Моди на Stardew Valley безкоштовно: скачати | FSBox",
    description:
      "Моди на Stardew Valley безкоштовно: нові персонажі, локації, квести та автоматизація ферми. Встановлення через SMAPI, описи українською.",
    h1: "Моди на Stardew Valley: завантажити безкоштовно",
    keywords: ["stardew valley mods", "моди stardew valley"],
  },
  ksp: {
    displayName: "Kerbal Space Program",
    title: "Моди на KSP (Kerbal Space Program) безкоштовно | FSBox",
    description:
      "Моди для Kerbal Space Program (KSP) безкоштовно: реалізм, нові деталі ракет, візуальні покращення. Описи українською мовою.",
    h1: "Моди на KSP: завантажити для Kerbal Space Program",
    keywords: ["ksp mods", "моди ksp", "kerbal space program mods"],
  },
  "project-zomboid": {
    displayName: "Project Zomboid",
    title: "Моди на Project Zomboid безкоштовно: скачати | FSBox",
    description:
      "Моди на Project Zomboid безкоштовно: реалістичний транспорт, зброя, одяг і QoL-покращення для виживання. Описи українською.",
    h1: "Моди на Project Zomboid: завантажити безкоштовно",
    keywords: ["моди project zomboid", "project zomboid mods"],
  },
  teardown: {
    displayName: "Teardown",
    title: "Моди на Teardown безкоштовно: карти та зброя | FSBox",
    description:
      "Моди на Teardown безкоштовно: нові карти з майстерні та потужна зброя для руйнувань. Файли з описом українською мовою.",
    h1: "Моди на Teardown: завантажити безкоштовно",
    keywords: ["teardown mods", "моди на тердаун"],
  },
  terraria: {
    displayName: "Terraria",
    title: "Моди на Terraria безкоштовно: Calamity, Thorium | FSBox",
    description:
      "Моди на Terraria безкоштовно: Calamity, Thorium та інші доповнення для tModLoader. Нова зброя, класи і боси українською.",
    h1: "Моди на Terraria: завантажити безкоштовно",
    keywords: ["terraria mods", "моди на terraria"],
  },
  wow: {
    displayName: "World of Warcraft",
    title: "Аддони для World of Warcraft безкоштовно | FSBox",
    description:
      "Аддони для World of Warcraft безкоштовно: DBM, BigWigs, WeakAuras, ElvUI. Добірка для рейдів і PvP з описом українською.",
    h1: "Аддони для WoW: завантажити безкоштовно",
    keywords: ["wow аддони", "wow mods", "аддони world of warcraft"],
  },
  hytale: {
    displayName: "Hytale",
    title: "Моди на Hytale безкоштовно: скачати | FSBox",
    description:
      "Моди для Hytale безкоштовно: покращення інтерфейсу, нові механіки, біоми та карти. Інструкції зі встановлення українською.",
    h1: "Моди на Hytale: завантажити безкоштовно",
    keywords: ["hytale mods", "моди hytale"],
  },
};