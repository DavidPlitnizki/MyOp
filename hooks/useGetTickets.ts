import { UserType } from "@/types";
import { useState, useCallback, useRef } from "react";

const useGetTickets = () => {
    const [data, setData] = useState({tickets: [], maxLength: 0});
    const [isPending, setIsPending] = useState(false);
    const [isError, setError] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const getData = useCallback (async ({page, userType, filterTickets}: {page: number, userType: UserType,filterTickets : string}) => {
        try {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            const controller = new AbortController();
            abortControllerRef.current = controller;

            setIsPending(true);
            setError(false);
            const result = await fetch(`/api/tickets/?userType=${userType}&page=${page}&filterTickets=${filterTickets}`, {
                signal: controller.signal,
            });
            if (result.ok) {
                const data = await result.json();
                const prepareObj = {
                    tickets: data.data,
                    maxLength: data.maxLength
                }
                setData(prepareObj);
            }
        }catch(error: unknown) {
            setError(!error);
        } finally {
            setIsPending(false);
        }
        
      }, []);

    return {data, isPending, isError, getData}
}
export default useGetTickets;
