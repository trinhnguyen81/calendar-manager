import PlusIcon from "@/public/images/plus.png";
import Image from "next/image";

import { Exercises } from "../interface";
import CardItem from "./CardItem";

interface Props {
    onAddMoreExercise: () => void;
    exercises: Exercises[]
    id?: string
}
const RenderList: React.FC<Props> = ({ exercises, onAddMoreExercise }) => {
    return (
      <>
        <div>
          {
            exercises.map((exercise, idx) => (
              <CardItem key={idx} exercise={exercise} />
            ))
          }
        </div>
         <div className="flex justify-end cursor-pointer" onClick={onAddMoreExercise}>
          <Image src={PlusIcon} alt="Add Exercise" />
        </div>
      </>
    )
  };

export default RenderList