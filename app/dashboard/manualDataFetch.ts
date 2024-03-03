const dataValueSupplier = async (): Promise<any> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk/supplier`,
    {
      cache: "no-store",
    },
  )
  return res.json()
}

const dataValueUsers = async (): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`, {
    cache: "no-cache",
  })
  return res.json()
}

const dataValueProduct = async (): Promise<any> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk`,
    {
      cache: "no-cache",
    },
  )
  return res.json()
}

const dataValueTransaksi = async (): Promise<any> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/transaksi?tanggal=&view=day`,
    {
      cache: "no-cache",
    },
  )
  return res.json()
}

export {
  dataValueSupplier,
  dataValueUsers,
  dataValueProduct,
  dataValueTransaksi,
}
