import Image from "next/image";
import { TicketTouristResponseType } from "@/types";

interface IProps {
  ticket: TicketTouristResponseType;
}

const ListItem = ({ ticket }: IProps) => {
  return (
    <div className="flex flex-col border" key={ticket.id}>
      <div className="flex flex-row  items-start p-4">
        <Image
          className="h-[250] w-[300]"
          priority
          src={ticket.img}
          width={300}
          height={250}
          alt={ticket.title}
        />
        <div className="flex flex-col ml-4">
          <h2 className="font-bold">{ticket.title}</h2>
          <h3 className="mt-2">{ticket.description}</h3>
        </div>
      </div>
    </div>
  );
};
export default ListItem;
