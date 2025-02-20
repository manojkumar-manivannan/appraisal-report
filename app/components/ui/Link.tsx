import React, { FC } from "react";

interface Props {
  title: string;
  onClick: (() => void) | undefined | ((event: unknown) => void);
}
const Link: FC<Props> = ({ title, onClick }) => {
  return (
    <div onClick={onClick} className="btn btn-outline btn-accent btn-sm">
      {title}
    </div>
  );
};

export default Link;
