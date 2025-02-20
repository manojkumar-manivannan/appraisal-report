import { FC } from "react";

interface Props {
  children: React.ReactNode;
}
const List: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col items-start justify-center gap-1">
      {children}
    </div>
  );
};

export default List;
