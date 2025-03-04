import { TicketLocalResponseType } from "@/types";

interface IProps {
  ticket: TicketLocalResponseType;
}

const GridItem = ({ ticket }: IProps) => {
  return (
    <div className="flex flex-col w-72 border" key={ticket.id}>
      <div className="p-8">
        <h2 className="font-bold">{ticket.title}</h2>
        <h3 className="mt-2">{ticket.description}</h3>
        <div className="flex flex-row w-full justify-between items-center mt-8">
          <span>{ticket.location}</span>
          <span>{ticket.date}</span>
        </div>
      </div>
    </div>
  );
};
export default GridItem;
