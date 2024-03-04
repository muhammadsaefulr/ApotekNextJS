"use client"

import { columns, dataItems } from "./columns"
import DataTable from "./data-table"

import { useEffect } from 'react';
import { useGetStaffList, useGetSupplierProduct } from "@/app/react-query/action";
import CardSkeleton from "@/components/CardSkeleton";
import { setStatedataStaffQuery } from "@/app/state/store/queryInput/store";

  interface Props {}
  export default function Page({}: Props) {

    const { dataStaffQuery } = setStatedataStaffQuery()

    console.log("get state zustand staffQuery: ", dataStaffQuery)
    const { data, isLoading, isError, isSuccess } = useGetStaffList({username: dataStaffQuery?.username})
    // console.log("data staff : ",data?.data, "isLoading: ", isLoading)
    
    const jsonData: dataItems[] =  data && data.data ? data.data.map((item)  => {
      return {
        id: item.id,
        username: item.username,
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
