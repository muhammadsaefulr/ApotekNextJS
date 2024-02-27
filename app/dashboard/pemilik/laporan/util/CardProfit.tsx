import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CardProfit({ data }: any) {
  return (
    <>
      <div className='pt-3'>
        <Card className={cn("mx-auto w-[380px]")}>
          <CardHeader>
            <CardTitle className='text-center font-medium pt-2'>
              Keuntungan Bersih Bulan Ini
            </CardTitle>
          </CardHeader>
          <CardContent className='mx-auto text-center '>
            <p className='pb-4 text-2xl font-bold'>Rp. {data}</p>
            <div className='flex justify-center pb-2'>
            <hr className="mt-2 border-2 rounded-md w-24"/>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
