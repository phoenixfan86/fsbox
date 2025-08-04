import Instruсtion from "@/components/Instruction";

const instruction = () => {
  return (
    <section className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px] shadow">
      <h2 className="text-xl font-semibold mb-1">Як встановити моди: покрокова інструкція</h2>
      <p className="text-sm text-(--color-3) mb-4 ">Встановлення модів — це найпростіший спосіб додати улюбленій грі нові можливості, предмети, локації та покращення графіки. У цьому керівництві ми розповімо, як правильно завантажити та встановити моди, щоб вони працювали без помилок.</p>

      <h3 className="text-lg font-semibold mb-1">Що таке моди?</h3>
      <p className="text-sm text-(--color-3) mb-4">Моди (від слова modification) — це користувацькі чи офіційні доповнення до гри, які змінюють або розширюють її функціонал. Вони можуть додавати нову зброю, техніку, карти, персонажів чи навіть змінювати ігровий процес.</p>

      <div className="flex mt-5 ml-10">
        <Instruсtion />
      </div>
    </section>
  );
}
export default instruction;