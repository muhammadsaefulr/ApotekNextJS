import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CardLabaKotor({ data }: any) {
  return (
    <>
      <div className='pt-3'>
        <Card className={cn("mx-auto w-[320px]")}>
          <CardHeader>
            <CardTitle className='text-center font-medium pt-2'>
             Laba Kotor Bulan Ini
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
