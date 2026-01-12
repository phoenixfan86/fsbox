
import Link from "next/link";
import { Metadata } from "next";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { getAllGames, getSortedModsData } from "@/lib/mods";
import { getCachedModsData } from "@/lib/modCached";
import { stripMarkdown } from "@/lib/stripMarkDown";
import OptimizedImage from "@/components/OptimizedImages";

type GameParams = Promise<{ game: string }>;

export async function generateMetadata({
  params
}: {
  params: GameParams
}): Promise<Metadata> {
  const { game } = await params;
  const canonical = `https://fsbox.pp.ua/mods/${game}`;

  const gameTitle = game.charAt(0).toUpperCase() + game.slice(1);
  const title = `Збірка модів на ${gameTitle}`;
  const description = `Добірка модів для ${gameTitle}: моди на зброю та броню, моди на техніку і транспорт, моди на біоми, меблі та прикраси. Завантажуйте моди та робіть гру в ${gameTitle} цікавішою`;
  const keywords = `моди ${game}, ${game} mods, моди на зброю, моди на машини, шейдери, карти, інтерєри`;

  return {
    alternates: { canonical },
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "./img/preview.png",
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      url: canonical,
      type: "article",
      siteName: "FSBox",
    }
  };
}


export function generateStaticParams() {
  const games = getAllGames();
  return games.map((game) => ({ game: game.slug }));
}

export default async function GameModsPage({ params }: { params: Promise<{ game: string }> }) {
  const { game } = await params;
  const allMods = getCachedModsData();
  const gameMods = allMods.filter(mod => mod.gameSlug === game);

  if (gameMods.length === 0) {
    return <p>Немає модів для цієї гри.</p>;
  }

  const gameName = gameMods[0].game;

  return (
    <section className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px]">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">
          Моди на Minecraft - Завантажити Найкращі Модифікації для Майнкрафт
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-6 leading-relaxed">
            Відкрийте для себе величезну колекцію <strong>модів на Minecraft</strong>, які повністю трансформують ваш ігровий досвід. Наш каталог містить тисячі найпопулярніших та найякісніших модифікацій для всіх версій гри - від класичних релізів до найновіших оновлень. Завантажуйте моди безкоштовно та перетворіть свій світ Майнкрафт на неймовірну пригоду!
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Найпопулярніші Категорії Модів для Minecraft
          </h2>

          <p className="mb-4">
            <strong>Моди на технологію та механізми</strong> - революціонізуйте своє виживання за допомогою індустріальних модів. Встановлюйте <strong>Industrial Craft</strong>, <strong>BuildCraft</strong>, <strong>Mekanism</strong> та <strong>Thermal Expansion</strong> для автоматизації видобутку ресурсів, створення складних заводів та енергетичних систем. Ці моди додають конвеєри, дробарки, електричні печі, генератори енергії, квантові сховища та сотні інших машин, які зроблять ваш геймплей максимально ефективним.
          </p>

          <p className="mb-4">
            <strong>Моди на зброю та броню</strong> - розширте свій арсенал за допомогами модифікацій, які додають сотні нових видів озброєння. Від середньовічних мечів та луків до футуристичних лазерних гармат та плазмових рушниць. Популярні моди як <strong>Tinkers' Construct</strong> дозволяють створювати кастомну зброю з різних матеріалів, а <strong>Spartan Weaponry</strong> додає списи, алебарди, рапіри та інші унікальні види озброєння для різних стилів бою.
          </p>

          <p className="mb-4">
            <strong>Моди на транспорт і техніку</strong> - пересувайтеся світом Minecraft з комфортом. Встановлюйте моди на автомобілі, літаки, поїзди, кораблі та космічні ракети. <strong>MrCrayfish's Vehicle Mod</strong> додає реалістичні автомобілі з працюючою фізикою, <strong>Immersive Engineering</strong> дозволяє будувати залізничні системи, а <strong>Advanced Rocketry</strong> відкриває космічні подорожі та колонізацію інших планет.
          </p>

          <p className="mb-4">
            <strong>Моди на біоми та генерацію світу</strong> - досліджуйте абсолютно нові ландшафти. <strong>Biomes O' Plenty</strong>, <strong>Terralith</strong> та <strong>Oh The Biomes You'll Go</strong> додають сотні унікальних біомів з власною флорою, фауною та ресурсами. Від магічних чарівних лісів до спекотних вулканічних пустель, від кришталевих печер до небесних островів - кожне дослідження стає неповторним.
          </p>

          <p className="mb-4">
            <strong>Моди на магію та чарівництво</strong> - оволодійте містичними силами за допомогою магічних модифікацій. <strong>Thaumcraft</strong>, <strong>Botania</strong>, <strong>Ars Nouveau</strong> та <strong>Mana and Artifice</strong> додають комплексні системи магії з заклинаннями, ритуалами, магічними артефактами та алхімією. Створюйте чарівні палички, телепортуйтеся між локаціями, призивайте магічних створінь та керуйте стихіями.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            RPG Моди та Моди на Пригоди
          </h2>

          <p className="mb-4">
            Трансформуйте Minecraft у повноцінну RPG гру з <strong>модами на підземелля, босів та прокачку персонажа</strong>. Встановлюйте <strong>Dungeon Crawl</strong>, <strong>When Dungeons Arise</strong> та <strong>YUNG's Better Dungeons</strong> для генерації епічних підземель, наповнених ворогами та скарбами. Моди як <strong>Leveling Up</strong> та <strong>Skills</strong> додають системи прокачки навичок, а <strong>Apotheosis</strong> революціонізує систему зачарувань та додає рідкісний лут легендарної якості.
          </p>

          <p className="mb-4">
            <strong>Моди на босів та нових мобів</strong> роблять геймплей більш динамічним та складним. <strong>Mowzie's Mobs</strong>, <strong>Ice and Fire</strong>, <strong>Twilight Forest</strong> додають десятки унікальних створінь від драконів до міфічних істот. Кожен бос має унікальні механіки бою та винагороджує гравців ексклюзивним лутом та ресурсами для крафту легендарного спорядження.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Моди на Декор, Будівництво та Меблі
          </h2>

          <p className="mb-4">
            Створюйте неймовірні будівлі за допомогою <strong>модів на декорації та меблі</strong>. <strong>MrCrayfish's Furniture Mod</strong>, <strong>Macaw's Furniture</strong>, <strong>Decorative Blocks</strong> та <strong>Chipped</strong> додають тисячі декоративних блоків, меблів та архітектурних елементів. Оздоблюйте свої будинки реалістичними меблями, картинами, освітленням, кухонною технікою та багато чим іншим.
          </p>

          <p className="mb-4">
            <strong>Моди на будівництво</strong> як <strong>Chisel</strong>, <strong>FramedBlocks</strong> та <strong>Carpenter's Blocks</strong> розширюють можливості креативу, додаючи варіації блоків з різними текстурами та формами. Будуйте середньовічні замки, сучасні хмарочоси, космічні станції або фентезійні села з набагато більшою деталізацією та різноманітністю.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Оптимізація та Покращення Геймплею
          </h2>

          <p className="mb-4">
            <strong>Моди на оптимізацію продуктивності</strong> - збільште FPS та зменшіть лаги. <strong>OptiFine</strong>, <strong>Sodium</strong>, <strong>Lithium</strong> та <strong>Phosphor</strong> значно покращують продуктивність гри, дозволяючи насолоджуватися Minecraft навіть на слабких комп'ютерах. Ці моди оптимізують рендеринг, освітлення та завантаження чанків без втрати візуальної якості.
          </p>

          <p className="mb-4">
            <strong>Моди на інтерфейс та зручність</strong> покращують користувацький досвід. <strong>Just Enough Items (JEI)</strong> показує всі рецепти крафту, <strong>JourneyMap</strong> додає детальну карту світу, <strong>Inventory Tweaks</strong> автоматично сортує інвентар, а <strong>The One Probe</strong> відображає інформацію про блоки та моби при наведенні курсора.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Моди для Різних Версій Minecraft
          </h2>

          <p className="mb-4">
            Наш каталог містить моди для всіх популярних версій Minecraft: <strong>моди на Майнкрафт 1.21.1</strong>, <strong>1.20.1</strong>, <strong>1.19.4</strong>, <strong>1.18.2</strong>, <strong>1.16.5</strong>, <strong>1.12.2</strong> та багато інших. Кожен мод ретельно перевірений на працездатність та сумісність. Ми регулярно оновлюємо колекцію, додаючи нові моди та оновлення до існуючих модифікацій.
          </p>

          <p className="mb-4">
            Більшість модів доступні як для <strong>Forge</strong>, так і для <strong>Fabric</strong> - двох найпопулярніших модлоадерів. Forge пропонує стабільність та сумісність з великою кількістю модів, тоді як Fabric відзначається легкістю та швидкодією. Вибирайте модлоадер відповідно до ваших потреб та встановлюйте моди одним кліком.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Як Встановити Моди на Minecraft
          </h2>

          <p className="mb-4">
            Встановлення модів на Майнкрафт - це простий процес. Спочатку завантажте та встановіть <strong>Forge</strong> або <strong>Fabric</strong> для вашої версії гри. Потім завантажте бажані моди з нашого каталогу та помістіть їх у папку "mods" у директорії Minecraft. Запустіть гру через профіль з модлоадером, і моди автоматично завантажаться.
          </p>

          <p className="mb-4">
            Для комплексного досвіду рекомендуємо встановлювати <strong>модпаки</strong> - готові збірки модів, які оптимізовані для спільної роботи. Популярні модпаки як <strong>All the Mods</strong>, <strong>FTB Academy</strong>, <strong>Enigmatica</strong> та <strong>Vault Hunters</strong> пропонують сотні годин геймплею з збалансованою прогресією та квестовими системами.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Найкращі Моди 2025 Року
          </h2>

          <p className="mb-4">
            Серед найпопулярніших модифікацій 2025 року виділяються: <strong>Create</strong> - мод на механізми з унікальною системою передачі обертання, <strong>Farmer's Delight</strong> - розширений фермерський досвід з кулінарією, <strong>Alex's Mobs</strong> - додає 100+ реалістичних тварин, <strong>Immersive Engineering</strong> - індустріальний мод з мультіблоковими структурами.
          </p>

          <p className="mb-4">
            Інші обов'язкові моди включають: <strong>Applied Energistics 2</strong> для цифрових сховищ, <strong>Tinkers' Construct</strong> для кастомної зброї та інструментів, <strong>Blood Magic</strong> для темної магії, <strong>Environmental</strong> для нових біомів, та <strong>Supplementaries</strong> для сотень декоративних блоків.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Завантажуйте Моди Безпечно
          </h2>

          <p className="mb-4">
            Всі моди в нашому каталозі посилаються на офіційні джерела - <strong>CurseForge</strong> та <strong>Modrinth</strong>. Це гарантує безпеку ваших завантажень та підтримку розробників модів. Ми не розміщуємо пірацькі копії та завжди рекомендуємо завантажувати модифікації з перевірених платформ.
          </p>

          <p className="mb-6">
            Приєднуйтесь до мільйонів гравців, які вже трансформували свій Minecraft за допомогою модів. Досліджуйте наш каталог, завантажуйте найкращі модифікації безкоштовно та створюйте власну унікальну пригоду в світі Майнкрафт. Нехай ваша гра стане ще цікавішою, складнішою та захоплюючішою з нашою колекцією модів!
          </p>
        </div>
      </div>
      <ul className="space-y-4 md:space-y-8">
        {gameMods.map((mod) => (
          <li key={mod.slug} className="p-4 rounded shadow">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 hover:opacity-90 transition">
              <OptimizedImage
                src={mod.image_first}
                alt={`Скріншот мода ${mod.mod_name} для ${mod.game}`}
                width={300}
                height={0}
                fit="inside"
                objectFit="contain"
                className="postImg hover:!scale-none object-cover rounded"
              />
              <div className="flex gap-5 flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    <Link href={`/mods/${mod.gameSlug}/${mod.slug}`}>
                      {mod.title_ua} для {mod.game} {mod.tags?.[mod.tags.length - 1] ?? ''}
                    </Link>
                  </h2>
                  <div className="flex items-center text-xs text-gray-500 gap-1">
                    <MdOutlineCalendarMonth size={16} className="inline-block text-gray-400" />
                    <span>{mod.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mr-10">
                  {stripMarkdown(mod.content).slice(0, 100)}...
                </p>
                <div>
                  <div className="flex gap-1.5 flex-wrap mt-1 md:mt-2 space-x-0  md:space-x-2">
                    {mod.tags?.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-200 hover:bg-blue-500 hover:text-white duration-300 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <span className="text-xs text-gray-500 block">Автор: {mod.author}</span>
              <span className="text-xs text-gray-500 block">
                <Link href={`${mod.game_collection}`}>для: {mod.game}</Link>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
