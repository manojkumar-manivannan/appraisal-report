import React, { FC } from "react";

interface Props {
  title: string;
  onClick: (() => void) | undefined | ((event: unknown) => void);
}

const MenuOption: FC<Props> = ({ title, onClick }) => {
  return (
    <button
      className="block w-full rounded border-none px-2 py-0.5 text-center text-sky-500 transition duration-300 hover:bg-sky-500 hover:text-white"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default MenuOption;
