export type TicketLocalResponseType = {
    id: number,
    title: string,
    description: string,
    date: string,
    location: string,
}

export type TicketTouristResponseType = {
    id: number,
    title: string,
    description: string,
    img: string,
}


export type TicketsResponseType = TicketLocalResponseType | TicketTouristResponseType;

export type UserType = 'local' | 'tourist';
export const userTypes: UserType[] = ['local', 'tourist']
