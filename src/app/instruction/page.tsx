import Instruсtion from "@/components/Instruction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Інструкція як встановити моди скачані на FSbox",
  description: "Встановлення модів — це найпростіший спосіб додати улюбленій грі нові можливості, предмети, локації та покращення графіки.",
  alternates: {
    canonical: "https://fsbox.pp.ua/instruction"
  },
  openGraph: {
    title: "FSbox - скачати безкоштовно кращі моди для ігор",
    description: "Встановлення модів — це найпростіший спосіб додати улюбленій грі нові можливості, предмети, локації та покращення графіки.",
    url: "https://fsbox.pp.ua/instruction",
    siteName: "FSBox",
    type: "website",
    images: [
      {
        url: "/img/preview.png",
        width: 1200,
        height: 630,
        alt: "FSBox — скачати кращі моди для ігор",
      },
    ],
  }
};

const instruction = () => {
  return (
    <section className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px] shadow">
      <h1 className="text-xl font-semibold mb-1">Як встановити моди: покрокова інструкція</h1>
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