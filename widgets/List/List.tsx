import { TicketTouristResponseType } from "@/types";
import ListItem from "@/widgets/List/ListItem";

interface IProps {
  data: TicketTouristResponseType[] | [];
}

const List = ({ data }: IProps) => {
  return (
    <div
      className="flex flex-col container w-full mt-4 mx-auto gap-4"
      data-testid="list-layout"
    >
      {data.map((item) => (
        <ListItem ticket={item} key={item.id} />
      ))}
    </div>
  );
};
export default List;
