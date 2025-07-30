import type { topNavItemsProps } from "@/types/TopNavItemsProps";

const Header = () => {
  const topNavItems: topNavItemsProps[] = [
    {
      label: 'Home',
      link: '#'
    },
    {
      label: 'Minecraft',
      link: '#'
    },
    {
      label: 'Terraria',
      link: '#'
    },
    {
      label: 'Stardew valley',
      link: '#'
    },
    {
      label: 'Kerbal Space Program',
      link: '#'
    },
  ]


  return (
    <header>
      <div className="h-10 flex items-center bg-(--bg-1)">
        <ul className="flex gap-3 items-center mx-6 text-[11px] uppercase">
          {topNavItems.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-35 flex gap-30 items-center justify-between py-[30px] px-[25px] bg-(--bg-2)">
        <div className="w-[40%]">
          <a href="/" className="group text-3xl uppercase font-bold">
            <h1 className="text-(--primary-color-1) group-hover:text-white transition-colors duration-600">FS<span className="text-white group-hover:text-(--primary-color-1) transition-colors duration-600">box</span>
            </h1>
          </a>
          <span>Кращі моди для ігор</span>
        </div>
        <div className="w-[60%] flex gap-4 justify-end">
          <input
            type="text"
            placeholder="Почніть писати назву"
            autoComplete="off"
            className="w-40 focus:w-1/2 text-white py-[5px] px-[10px] ring-1 ring-(--color-1) focus:ring-(--primary-color-1) rounded-[5px] outline-0 placeholder:text-sm duration-500" />
          <button className="py-[3px] px-[10px] text-white bg-(--primary-color-1) rounded-[5px] hover:scale-95 duration-300">Пошук</button>
        </div>
      </div>
    </header>
  );
}
export default Header;