"use client"

import { useQuery } from "@tanstack/react-query"
import GetAllProduct from "./test-product-getAll"

import { ApiProductResponse } from "../../../types/next-api"
import { useGetProduct } from "../../react-query/action"

export default function Page() {
  return (
    <div>
    <GetAllProduct/>
    </div>
  )
}
