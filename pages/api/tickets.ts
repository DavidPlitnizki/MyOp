import type { NextApiRequest, NextApiResponse } from 'next'
import MockData from '../../data/mock.json';
import { TicketsResponseType, UserType } from '@/types';

type MockDataType = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  img: string;
}

const GROUP = 10;

interface ITicketsQuery {
  userType: UserType;
  page: number;
  filterTickets: string;
}

 
type ResponseData = {
  data: TicketsResponseType[]
  error: string
  maxLength: number;
}

const filteredByUserType = (groupData: MockDataType[], userType: UserType) => {
  switch(userType) {
    case 'local':
      return groupData.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        date: item.date,
        location: item.location,
      }))
    case 'tourist':
      return groupData.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        img: item.img
      }))
    default:
      const invalidUserType: never = userType;
      console.error(`Invalid userType: ${invalidUserType}`);
      return [];
  }
}

const getGroupDataByUserType = ({page, userType, filterTickets}: {page: number, userType: UserType, filterTickets: string}) => {
  const filteredMockData = MockData.filter((item) => item.title.toLowerCase().includes(filterTickets.toLowerCase()) || item.description.toLowerCase().includes(filterTickets.toLowerCase()))
  const groupData = filteredMockData.slice(page * GROUP, (page + 1) * GROUP);
  const filteredStructure =  filteredByUserType(groupData, userType);
  return {
    filteredStructure,
    maxLength: MockData.length
  }
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    const { userType, page, filterTickets } = req.query as Partial<Record<keyof ITicketsQuery, string>>;
    const params = {
      page: Number(page),
      userType: userType as UserType,
      filterTickets: filterTickets ?? ''
    }

    const {filteredStructure , maxLength} = getGroupDataByUserType(params);
    if (filteredStructure !== undefined) {
      res.status(200).json({ data: filteredStructure, error: '', maxLength });
    } else {
      res.status(500).json({data: [], maxLength, error: 'Something Wrong' })
    }
   
  }
}