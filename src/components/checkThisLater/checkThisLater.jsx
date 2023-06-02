import axios from "axios";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useQuery } from "react-query";

import { CustomerDataAtom } from "./store";

const PaginationTest = (page, limit) => {
  const [, setData] = useAtom(CustomerDataAtom);

  const { data, status, isLoading } = useQuery(
    ["getMe", page, limit],
    async ({ queryKey }) => {
      const response = await axios.get(
        `http://localhost:3010/customer?_page=${queryKey[1]}&_limit=${queryKey[2]}`
      );

      return response.data;
    },
    {
      enabled: true,
    }
  );

  useEffect(() => {
    setData(data);
  }, [data]);
};

export default PaginationTest;
