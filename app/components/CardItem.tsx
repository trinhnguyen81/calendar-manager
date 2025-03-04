import { Exercises } from "../interface"

const CardItem = ({exercise}: {exercise: Exercises}) => {
    
  return (
    <div className="py-1 px-2 border border-[##DFDFDF] shadow-sm my-1 rounded z-[9999px]">
      <p className="text-[13px] font-semibold text-black text-right line-clamp-1">{exercise.name}</p>
      <div className="flex justify-between text-[#919CAD] gap-4">
        <p className="text-[10px] font-bold">{exercise.numberOfSets}x</p>
        <p className="line-clamp-1 text-[10px]">{exercise.setInformation}</p>
      </div>
    </div>
  )
}

export default CardItem