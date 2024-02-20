const dataValueSupplier = async (): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk/supplier`, {
      cache: "no-store"
  });
  return res.json();
}

const dataValueUsers = async (): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`)
  return res.json()
}

const dataValueProduct = async (): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk`)
  return res.json()
}

export { dataValueSupplier, dataValueUsers, dataValueProduct };
