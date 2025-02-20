import { FC } from "react";

interface Props {
  label: string;
  value: string;
}
const List: FC<Props> = ({ label, value }) => {
  return (
    <div className="flex flex-row text-gray-500">
      <p className="font-semibold">{label}</p>
      <span> : </span>
      <p>{value}</p>
    </div>
  );
};

export default List;
