import { TicketLocalResponseType } from "@/types";
import GridItem from "@/widgets/Grid/GridItem";

interface IProps {
  data: TicketLocalResponseType[] | [];
}

const Grid = ({ data }: IProps) => {
  return (
    <div
      className="flex container w-full mx-auto flex-wrap gap-8 justify-center my-4"
      data-testid="grid-layout"
    >
      {data.map((item) => (
        <GridItem ticket={item} key={item.id} />
      ))}
    </div>
  );
};
export default Grid;
