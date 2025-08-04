const Instruсtion = () => {
  return (
    <section>
      <details>
        <summary>Як встановити моди для Minecraft — повна інструкція</summary>
        <ul>
          <li>Скачайте мод для Minecraft з перевіреного джерела (наприклад, CurseForge або Modrinth).</li>
          <li>Переконайтеся, що у вас встановлений Minecraft Forge або Fabric — це обов’язкові інструменти для більшості модів.</li>
          <li>Відкрийте папку гри Minecraft на вашому комп’ютері.</li>
          <li>Перейдіть у директорію <code>/mods/</code> (створіть її, якщо вона відсутня).</li>
          <li>Перемістіть файл мода у форматі <code>.jar</code> у папку <code>/mods/</code>.</li>
          <li>Запустіть Minecraft з Forge або Fabric та перевірте, чи мод працює правильно.</li>
        </ul>
      </details>

      <details>
        <summary>Як встановити моди для Kerbal Space Program (KSP) — покрокова інструкція</summary>
        <ul>
          <li>Скачайте мод для KSP з офіційного форуму, SpaceDock або CurseForge.</li>
          <li>Розпакуйте архів мода у зручне місце.</li>
          <li>Відкрийте папку з грою Kerbal Space Program.</li>
          <li>Перейдіть у папку <code>/GameData/</code> (у ній зберігаються всі моди).</li>
          <li>Скопіюйте папку мода в <code>/GameData/</code>.</li>
          <li>Запустіть KSP та перевірте, чи мод відображається у грі.</li>
        </ul>
      </details>

      <details>
        <summary>Як встановити моди для Stardew Valley — інструкція для початківців</summary>
        <ul>
          <li>Скачайте мод для Stardew Valley з Nexus Mods або іншого перевіреного сайту.</li>
          <li>Встановіть SMAPI — спеціальний мод-менеджер для Stardew Valley (обов’язковий для більшості модів).</li>
          <li>Розархівуйте завантажений мод.</li>
          <li>Відкрийте папку з грою Stardew Valley.</li>
          <li>Перейдіть у директорію <code>/Mods/</code> (створіть її, якщо відсутня).</li>
          <li>Скопіюйте розпаковану папку мода у <code>/Mods/</code>.</li>
          <li>Запустіть гру через SMAPI, щоб моди працювали коректно.</li>
        </ul>
      </details>

      <details>
        <summary>Як встановити моди для Terraria — покрокова інструкція</summary>
        <ul>
          <li>Встановіть TModLoader — офіційний інструмент для встановлення модів Terraria.</li>
          <li>Запустіть Terraria через TModLoader.</li>
          <li>Відкрийте вбудоване меню "Mods".</li>
          <li>Завантажте потрібний мод безпосередньо через TModLoader або з офіційного форуму Terraria.</li>
          <li>Активуйте мод у списку встановлених та перезапустіть гру.</li>
        </ul>
      </details>

      <details>
        <summary>Як встановити моди для World of Warcraft (WoW) — інструкція з прикладами</summary>
        <ul>
          <li>Скачайте аддон для WoW з CurseForge або WowInterface.</li>
          <li>Розархівуйте завантажений архів з модом.</li>
          <li>Відкрийте папку з грою World of Warcraft.</li>
          <li>Перейдіть у <code>_retail_/Interface/AddOns/</code> (для актуальної версії) або <code>_classic_/Interface/AddOns/</code> (для WoW Classic).</li>
          <li>Скопіюйте папку аддона у <code>/AddOns/</code>.</li>
          <li>Запустіть WoW і увімкніть аддон у меню вибору персонажа.</li>
        </ul>
      </details>
    </section>
  );
}
export default Instruсtion;