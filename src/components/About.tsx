import Link from "next/link";

const About = () => {
  return (
    <section className="about flex gap-2 flex-col text-(--color-3) py-[15px] px-[10px] md:py-[25px] md:px-[30px] my-5 mx-5">
      <h2 className="text-lg text-(--bg-2) font-bold">Завантажуйте моди для улюблених ігор</h2>
      <p className="text-[13px] md:text-sm leading-relaxed mb-4">
        Шукаєте нові враження від знайомих ігор? На нашому порталі зібрані найкращі моди для
        <Link href="/mods/ksp" className="text-(--bg-2) hover:underline"> Kerbal Space Program (KSP)</Link>,
        <Link href="/mods/minecraft" className="text-(--bg-2) hover:underline"> Майнкрафт</Link>,
        <Link href="/mods/stardew-valley" className="text-(--bg-2) hover:underline"> Stardew Valley</Link>,
        <Link href="/mods/terraria" className="text-(--bg-2) hover:underline"> Terraria</Link> та
        <Link href="/mods/wow" className="text-(--bg-2) hover:underline"> World of Warcraft (WoW)</Link>.
        Ми створили цей ресурс для геймерів, які цінують якісний контент, зрозумілі інструкції та безпеку файлів. Тут ви знайдете як глобальні доповнення, що повністю змінюють ігрові механіки, так і невеликі візуальні покращення для щоденного використання.
      </p>

      <h2 className="text-xl text-(--bg-2) font-bold mt-8 mb-4">Світ модифікацій: чому це змінює ваш ігровий досвід?</h2>
      <p className="text-[13px] md:text-sm leading-relaxed mb-4">
        Модифікації (або моди) — це результат творчості тисяч розробників-ентузіастів по всьому світу. Вони дозволяють виправити помилки оригінальних ігор, додати новий контент, про який розробники лише мріяли, або повністю змінити жанр гри. Наприклад, звичайний симулятор ферми може перетворитися на складну економічну стратегію, а пісочниця з кубів — на реалістичний світ з 4K-текстурами та фізикою рідин.
        Наш сайт допомагає зорієнтуватися в цьому морі контенту, пропонуючи лише перевірені та актуальні версії доповнень.
      </p>

      {/* Розділ Minecraft */}
      <h2 className="text-xl text-(--bg-2) font-bold mt-8 mb-4">Моди для Майнкрафт: від шейдерів до технічних збірок</h2>
      <p className="text-[13px] md:text-sm leading-relaxed mb-4">
        Майнкрафт — це полотно для вашої уяви, а модифікації — це інструменти, що роблять його безмежним. Ми пропонуємо широкий вибір контенту для різних версій гри та завантажувачів (Forge, Fabric, Quilt).
      </p>
      <ul className="text-[13px] md:text-sm space-y-2 mb-6">
        <li>
          <strong>Шейдери та графіка:</strong> Для тих, хто хоче змінити візуальну складову, у нас є розділ з
          <Link href="/mods/minecraft"> шейдерами для Майнкрафт</Link>. Встановлюйте BSL, Complementary або SEUS, щоб додати реалістичні тіні, м’яке освітлення та динамічну воду.
        </li>
        <li>
          <strong>Технічні та магічні моди:</strong> Любите автоматизацію? Мод <em>Create</em> дозволить будувати складні механізми, а <em>Industrial Craft</em> перетворить ваш світ на індустріальний центр. Для фанатів фентезі ми підготували <em>Thaumcraft</em> та <em>Botania</em>.
        </li>
        <li>
          <strong>Нові біоми та виживання:</strong> Додавайте сотні нових рослин, тварин та локацій з модами типу <em>Biomes O' Plenty</em>. Описи українською допоможуть розібратися в складних механіках крафту та нових ресурсах.
        </li>
      </ul>

      {/* Розділ KSP */}
      <h2 className="text-xl text-(--bg-2) font-bold mt-8 mb-4">Kerbal Space Program (KSP): розширюйте межі космосу</h2>
      <p className="text-[13px] md:text-sm leading-relaxed mb-4">
        KSP — це гра про науку та підкорення планет. Але навіть у Кербіна є межі, які допоможуть розсунути <Link href="/mods/ksp">моди для Kerbal Space Program</Link>.
      </p>
      <ul className="text-[13px] md:text-sm space-y-2 mb-6">
        <li><strong>Конструктор ракет:</strong> Нові двигуни, паливні баки та капсули від реальних космічних агентств (NASA, SpaceX) або науково-фантастичні деталі для міжзоряних подорожей.</li>
        <li><strong>Інформаційні панелі:</strong> Без таких аддонів, як <em>Kerbal Engineer Redux</em>, важко розрахувати дельту-V або траєкторію посадки. Ми пропонуємо версії, що стабільно працюють на останніх патчах.</li>
        <li><strong>Візуальні пакети:</strong> Зробіть вигляд планет реалістичнішим за допомогою <em>Environmental Visual Enhancements (EVE)</em>.</li>
      </ul>

      {/* Розділ Stardew Valley */}
      <h2 className="text-xl text-(--bg-2) font-bold mt-8 mb-4">Stardew Valley: затишок, автоматизація та нові квести</h2>
      <p className="text-[13px] md:text-sm leading-relaxed mb-4">
        Якщо ваша ферма вже приносить мільйони, настав час для <Link href="/mods/stardew-valley">модів для Stardew Valley</Link>, які додають глибини сюжету та зручності.
      </p>
      <ul className="text-[13px] md:text-sm space-y-2 mb-6">
        <li><strong>Stardew Valley Expanded:</strong> Глобальний мод, який додає нових персонажів, локації та навіть цілі сюжетні лінії. Це фактично безкоштовне DLC для вашої гри.</li>
        <li><strong>Корисні утиліти:</strong> Відстежуйте розташування НПС на карті, бачте радіус дії лякалок або автоматизуйте збір молока та яєць.</li>
        <li><strong>Естетичні зміни:</strong> Замінюйте стандартні будівлі на вікторіанські маєтки або змінюйте портрети мешканців на більш сучасні чи анімовані варіанти.</li>
      </ul>

      <h2 className="text-xl text-(--bg-2) font-bold mt-8 mb-4">Terraria: виклик для справжніх героїв</h2>
      <p className="text-[13px] md:text-sm leading-relaxed mb-4">
        Світ Terraria величезний, але з <Link href="/mods/terraria">модами для Terraria</Link> він стає нескінченним. Більшість наших файлів адаптовані для використання через <strong>tModLoader</strong>.
      </p>
      <ul className="text-[13px] md:text-sm space-y-2 mb-6">
        <li><strong>Calamity та Thorium:</strong> Найвідоміші модифікації, що додають сотні нових босів, тисячі предметів зброї та унікальні класи персонажів.</li>
        <li><strong>Quality of Life:</strong> Моди на нескінченні зілля, швидке будівництво або магічне сховище (Magic Storage), яке вирішує проблему захаращених скринь.</li>
      </ul>

      <h2 className="text-xl text-(--bg-2) font-bold mt-8 mb-4">Аддони для World of Warcraft: ваш шлях до топового ДПС</h2>
      <p className="text-[13px] md:text-sm leading-relaxed mb-4">
        У світі Азероту правильна інформація — це запорука перемоги. <Link href="/mods/wow">Аддони для WoW</Link> допомагають налаштувати інтерфейс під ваші потреби.
      </p>
      <ul className="text-[13px] md:text-sm space-y-2 mb-6">
        <li><strong>Рейдові помічники:</strong> <em>DBM (Deadly Boss Mods)</em> та <em>WeakAuras</em> є обов’язковими для будь-якого рейдера. Ми надаємо актуальні збірки для Retail та Classic версій.</li>
        <li><strong>Інтерфейс та сумки:</strong> <em>ElvUI</em> для повної кастомізації екрана та <em>Bagnon</em> для зручного керування інвентарем.</li>
        <li><strong>Аукціон та золото:</strong> Використовуйте <em>TradeSkillMaster</em> для аналізу ринку та швидкого заробітку ігрової валюти.</li>
      </ul>

      <h2 className="text-xl text-(--bg-2) font-bold mt-8 mb-4">Чому геймери обирають наш портал?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-(--bg-3) rounded-lg">
          <h4 className="font-bold mb-2">Безкоштовно та доступно</h4>
          <p className="text-xs">Жодних платних підписок чи обмежень швидкості. Завантажуйте модифікації без реєстрації одним кліком.</p>
        </div>
        <div className="p-4 bg-(--bg-3) rounded-lg">
          <h4 className="font-bold mb-2">Рідна мова</h4>
          <p className="text-xs">Ми перекладаємо технічні описи та інструкції, щоб ви точно знали, як налаштувати мод без перекладача.</p>
        </div>
        <div className="p-4 bg-(--bg-3) rounded-lg">
          <h4 className="font-bold mb-2">Перевірена безпека</h4>
          <p className="text-xs">Усі файли проходять антивірусну перевірку. Ми дбаємо про безпеку вашого ПК та даних.</p>
        </div>
        <div className="p-4 bg-(--bg-3) rounded-lg">
          <h4 className="font-bold mb-2">Кросплатформеність</h4>
          <p className="text-xs">Шукаєте моди на телефон? Наш сайт ідеально відображається на мобільних пристроях.</p>
        </div>
      </div>

      <h2 className="text-xl text-(--bg-2) font-bold mt-8 mb-4">Як встановити моди: коротка інструкція</h2>
      <p className="text-[13px] md:text-sm leading-relaxed mb-4">
        Кожна гра має свої особливості встановлення доповнень. Для Майнкрафт зазвичай потрібен <strong>Forge</strong>, для Stardew Valley — <strong>SMAPI</strong>, а для Terraria — <strong>tModLoader</strong>. На сторінці кожного моду ви знайдете покроковий гайд, який допоможе уникнути помилок та конфліктів файлів. Не забувайте робити бекапи своїх збережень перед встановленням великих збірок!
      </p>

      <h2 className="text-xl text-(--bg-2) font-bold mt-8 mb-4">Почніть свою нову пригоду вже сьогодні</h2>
      <p className="text-[13px] md:text-sm leading-relaxed mb-8">
        Грайте по-новому, створюйте власні історії та досліджуйте світи без обмежень. Завантажуйте
        <Link href="/mods/minecraft"> моди для Майнкрафт</Link>, покращуйте графіку в KSP або підкорюйте рейди в WoW. Світ ігор постійно змінюється завдяки модмейкерам, і ми раді бути вашим провідником у цьому всесвіті контенту. Приєднуйтесь до нашої спільноти та відкривайте нові горизонти улюблених ігор прямо зараз!
      </p>


    </section >
  );
}
export default About;
