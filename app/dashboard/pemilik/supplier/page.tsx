"use client"

import { columns, dataItems } from "./columns"
import DataTable from "./data-table"

import { useEffect } from 'react';
import { useGetSupplierProduct } from "@/app/react-query/action";
import CardSkeleton from "@/components/CardSkeleton";
import { setStateDataSupplierQuery } from "@/app/state/store/queryInput/store";

  interface Props {}
  export default function Page({}: Props) {

    const extractDate = (isoDateString: string): string | null => {
      const regex = /^(\d{4}-\d{2}-\d{2})/;
      const match = isoDateString.match(regex);
      return match ? match[1] : null;
    };

    const { dataSupplierQuery } = setStateDataSupplierQuery()

    const { data, isLoading, isError, isSuccess } = useGetSupplierProduct(dataSupplierQuery)
    console.log("data supplier : ",data?.data, "isLoading: ", isLoading)
    
    const jsonData: dataItems[] =  data
    ? data?.data.map((item)  => {
      return {
        id: item.id,
        namaSupplier: item.namaSupplier,
        emailSupplier: item.emailSupplier,
        tglDitambahkan: extractDate(item.createdAt)
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
