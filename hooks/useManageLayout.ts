import { UserType } from "@/types";
import { ComponentType, lazy, useCallback } from "react";

const GridComponent = lazy(() => import('@/widgets/Grid/Grid'));
const ListComponent = lazy(() => import('@/widgets/List/List'));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MapLayout: Record<UserType, ComponentType<any>> = {
    'local': GridComponent,
    'tourist': ListComponent
}

const useManageLayout = (userType: UserType) => {
   const getComponent = useCallback(() => {
        return MapLayout[userType];
   }, [userType]);

   return {getComponent}
}
export default useManageLayout;
