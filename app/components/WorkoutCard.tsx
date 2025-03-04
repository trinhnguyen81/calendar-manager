
import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

import { Workout } from "../interface";
import Modal from "./Modal";
import RenderListExercise from "./RenderListExercise";

interface Props {
  workout: Workout;
  day: string;
  handleAddMoreExercise: (a: Workout, b: string ) => void
}

const WorkoutCard: React.FC<Props> = ({ workout, day, handleAddMoreExercise }) => {
  const [addNewExercises, setAddNewExercises] = useState({
    name: '',
    id: 0,
    numberOfSets: 0,
    setInformation: '',
    errorMessage: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${day}-${workout.id}`,
  });

  const onAddMoreExercise = () => {
    setIsModalOpen(true)
  };

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const classWhileDragging = 'p-2 border border-[#22242626] bg-white rounded mb-1'

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const onAddNewExercise = () => {
    if (!addNewExercises.name || !addNewExercises.numberOfSets || !addNewExercises.setInformation) {
      return setAddNewExercises({...addNewExercises, errorMessage: 'Please enter full information'})
    }
    const newExercises = {
      ...workout,
      exercises: [...workout.exercises, {id: new Date().valueOf(), name: addNewExercises.name, numberOfSets: addNewExercises.numberOfSets, setInformation: addNewExercises.setInformation}]
    }

    setIsModalOpen(false)
    setAddNewExercises({name: '', id: 0, numberOfSets: 0, setInformation: '', errorMessage: ''})
    handleAddMoreExercise(newExercises, day)
  }

  return (
    <>
      <div className={`${!isDragging ? classWhileDragging : '' }`}>
        <div suppressHydrationWarning ref={setNodeRef} style={style} {...listeners} {...attributes} className={`cursor-move ${isDragging ? classWhileDragging : ''}`}>
          <div className="flex justify-between gap-4">
            <p className="text-[#5A57CB] text-[10px] font-bold line-clamp-1 uppercase">
              {workout.name}
            </p>
            <p className="text-[#5A57CB] text-[10px] cursor-pointer">...</p>
          </div>
          {isDragging && <RenderListExercise exercises={workout.exercises} onAddMoreExercise={onAddMoreExercise} id={workout.id} /> }
        </div>

        {!isDragging && <RenderListExercise exercises={workout.exercises} onAddMoreExercise={onAddMoreExercise} id={workout.id} />}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4 text-black">Add new Exercise</h2>
        <p>Exercise name</p>
        <input type="text" className="border border-[#22242626] rounded w-full mb-4" onChange={(e) => setAddNewExercises({...addNewExercises, name: e.target.value})} />
        <p>The number of sets</p>
        <input type="number" className="border border-[#22242626] rounded w-full mb-4" onChange={(e) => setAddNewExercises({...addNewExercises, numberOfSets: Number(e.target.value)})} />
        <p>Set information</p>
        <input type="text" className="border border-[#22242626] rounded w-full mb-4" onChange={(e) => setAddNewExercises({...addNewExercises, setInformation: e.target.value})} />
        {
          addNewExercises.errorMessage && (
            <p className="text-red-500">{addNewExercises.errorMessage}</p>
          )
        }
        <div className="flex justify-end gap-4">
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:opacity-50 cursor-pointer"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className="cursor-pointer mt-4 px-4 py-2 bg-white rounded text-black border border-black hover:bg-[#F1F1F1]"
            onClick={onAddNewExercise}
          >
            Create
          </button>
        </div>
      </Modal>
    </>
  );
};

export default WorkoutCard;