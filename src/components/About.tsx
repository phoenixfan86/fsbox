import Link from "next/link";

const About = () => {
  return (
    <section className="about flex gap-2 flex-col text-(--color-3) py-[15px] px-[10px] md:py-[25px] md:px-[30px] my-5 mx-5">
      <h2 className="text-lg text-(--bg-2) font-bold">Завантажуйте моди для улюблених ігор</h2>
      <p className="text-[13px] md:text-sm">Шукаєте нові враження від знайомих ігор? На нашому сайті зібрані найкращі моди для <Link href={`/mods/ksp`}>Kerbal Space Program (KSP)</Link>, <Link href={`/mods/minecraft`}>Майнкрафт</Link>, <Link href={`/mods/stardew-valley`}>Stardew Valley</Link>, <Link href={`/mods/terraria`}>Terraria</Link> та <Link href={`/mods/wow`}>World of Warcraft (WoW)</Link>. Тут ви знайдете як глобальні доповнення, що змінюють гру з нуля, так і невеликі, але корисні модифікації для щоденного використання. Кожен мод має детальний опис, скріншоти та інструкцію з встановлення.</p>

      <h3>Найпопулярніші моди та доповнення</h3>
      <p className="text-[13px] md:text-sm">Ми постійно оновлюємо каталог, додаючи свіжі розробки модмейкерів з усього світу.</p>

      <ul className="text-[13px] md:text-sm">
        <li><Link href={`/mods/ksp`}>KSP (Kerbal Space Program)</Link> — нові ракети, планети, двигуни, реалістична фізика та місії.</li>
        <li><Link href={`/mods/minecraft`}>Майнкрафт</Link> — карти, шейдери, скіни, моби, біоми, нові механіки виживання.</li>
        <li><Link href={`/mods/stardew-valley`}>Stardew Valley</Link> — нові культури, тварини, фестивалі, предмети інтер’єру та покращення ферми.</li>
        <li><Link href={`/mods/terraria`}>Terraria</Link> — нові боси, зброя, броня, матеріали та унікальні біоми.</li>
        <li><Link href={`/mods/wow`}>WoW (World of Warcraft)</Link> — аддони, інтерфейси, покращення PvP та PvE, нові квести.</li>
      </ul>

      <h3>Чому варто обирати наш сайт</h3>

      <ul className="text-[13px] md:text-sm">
        <li><strong>Безкоштовне завантаження</strong> — усі моди доступні без реєстрації та прихованих платежів.</li>
        <li><strong>Українською мовою</strong> — опис, інструкції та категорії зрозумілі кожному гравцеві.</li>
        <li><strong>Зручний пошук</strong> — система тегів допоможе швидко знайти потрібну модифікацію.</li>
        <li><strong>Перевірені файли</strong> — ми тестуємо моди перед публікацією, щоб уникнути шкідливих програм.</li>
      </ul>

      <h3>Завантажуйте моди на ПК та мобільні пристрої</h3>
      <p className="text-[13px] md:text-smm">Наш сайт повністю адаптований для смартфонів і планшетів, тому ви можете завантажувати моди де завгодно — у транспорті, на роботі чи вдома. Просто відкрийте потрібну сторінку, виберіть мод і почніть установку. Ми зробили все, щоб процес був швидким і зрозумілим.</p>

      <h3>Почніть грати по-новому</h3>
      <p className="text-[13px] md:text-sm">Модифікації — це новий рівень гри. Вони додають улюбленим світам нові можливості, роблять геймплей цікавішим та дозволяють створювати власні історії. Завантажуйте безкоштовні <Link href={`/mods/ksp`}> моди для Kerbal Space Program (KSP)</Link>, <Link href={`/mods/minecraft`}>моди для Майнкрафт</Link>, <Link href={`/mods/stardew-valley`}>моди для Stardew Valley</Link>, <Link href={`/mods/terraria`}>моди для Terraria</Link> та <Link href={`/mods/wow`}>аддони для World of Warcraft (WoW)</Link> прямо зараз і відкрийте для себе нові горизонти у знайомих іграх.</p>
    </section >
  );
}
export default About;
