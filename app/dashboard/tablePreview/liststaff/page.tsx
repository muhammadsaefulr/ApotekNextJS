"use client"

import { columns, dataItems } from "./columns"
import DataTable from "./data-table"

import { useEffect } from 'react';
import { useGetStaffList, useGetSupplierProduct } from "@/app/react-query/action";
import CardSkeleton from "@/components/CardSkeleton";
import { setStateDataSupplierQuery } from "@/app/state/store/queryInput/store";

  interface Props {}
  export default function ListStaff({}: Props) {

    const extractDate = (isoDateString: string): string | null => {
      const regex = /^(\d{4}-\d{2}-\d{2})/;
      const match = isoDateString.match(regex);
      return match ? match[1] : null;
    };

    const { data, isLoading, isError, isSuccess } = useGetStaffList()
    console.log("data staff : ",data?.data, "isLoading: ", isLoading)
    
    const jsonData: dataItems[] =  data && data.data ? data.data.map((item)  => {
      return {
        id: item.id,
        username: item?.username,
        email: item.email,
        role: item.role
      };
    }) : []


    if (isLoading) {
      return <CardSkeleton />
    } else {
      return (
        <div>
          <DataTable columns={columns} data={jsonData} />
        </div>
      )
    }
}
