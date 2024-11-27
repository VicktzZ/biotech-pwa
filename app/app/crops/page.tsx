import CropCard from "@/components/CropCard";
import { InfoCard } from "@/components/InfoCard";
import { Button } from "@/components/ui/button";
import { SproutIcon } from "lucide-react";

export default function page() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Button>Adcionar uma plantação</Button>
      </div>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        <CropCard amount={20} average="Bom" cropTitle="Cenoura" />
      </div>
    </div>
  )
}