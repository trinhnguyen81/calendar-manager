"use client";
import { DndContext, DragEndEvent, DragStartEvent, closestCorners } from "@dnd-kit/core";
import { useState } from "react";
import Image from 'next/image';

import PlusIcon from '@/public/images/plus.png';

import WorkoutCard from './WorkoutCard';
import DroppableColumn from "./DroppableColumn";
import { Workout } from "../interface";
import Modal from "./Modal";
import { getCurrentWeekDayNumbers } from "../utils";

const dayOfToday = new Date().getDate()

const initialData: Record<string, Workout[]> = {
  Mon: [{ id: "w1", name: "Chest Day - with Arm exercises", exercises: [{id: 1, name: "Bench Press", numberOfSets: 3, setInformation: '50 lb x 5, 60 lb x 5, 70 lb x 5' }] }],
  Tue: [],
  Wed: [],
  Thur: [],
  Fri: [],
  Sat: [],
  Sun: [],
};

export default function WorkoutCalendar() {
  const [calendar, setCalendar] = useState(initialData);
  const [isDragging, setIsDragging] = useState(false);
  const [currentColumn, setCurrentColumn] = useState('');
  const [newWorkoutName, setNewWorkoutName] = useState({
    name: '', id: 0, columnId: '', errorMessage: ''});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, workoutId] = String(active.id).split('-')
    

    if (over?.id !== currentColumn) {
        const newCalendar = Object.entries(calendar).reduce((acc, [key, value]) => {
            if (key === currentColumn) {
                const newWorkouts = value.filter(i => i.id !== workoutId)
    
                return {
                    ...acc,
                    [key]: newWorkouts
                }
            }
            if (over?.id === key) {
                return {
                    ...acc,
                    [key]: [...value, calendar[currentColumn].find(i => i.id === workoutId)]
                }
            }
            
            return {
                ...acc,
                [key]: value
            }
    
        }, {})
    
        setCalendar(newCalendar)
    }
    setCurrentColumn('')
    setIsDragging(false)
  }

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event
    const [day] = String(active.id).split('-')
    
    setCurrentColumn(day)
    setIsDragging(true)
  }

  const onDragCancel = () => {
    setCurrentColumn('')
    setIsDragging(false)
  }

  const onOpenNewWorkout = (day: string) => {
    setIsModalOpen(true)
    setNewWorkoutName({name: '', id: new Date().valueOf(), columnId: day, errorMessage: ''})
  }

  const onAddNewWorkout = () => {
    if (!newWorkoutName.name) {
      return setNewWorkoutName({...newWorkoutName, errorMessage: 'Please enter a name'})
    }
    const newCalendar = {
      ...calendar,
      [newWorkoutName.columnId]: [
        {id: String(newWorkoutName.id), name: newWorkoutName.name, exercises: []},
        ...calendar[newWorkoutName.columnId]
      ]
    }
    setCalendar(newCalendar)
    closeModal()
  }


  const closeModal = () => {
    setIsModalOpen(false)
    setNewWorkoutName({name: '', id: 0, columnId: '', errorMessage: ''})
  }

  const handleAddMoreExercise = (workout: Workout, day: string) => {
    const newCalendar = {
      ...calendar,
      [day]: calendar[day].map(i => i.id === workout.id ? workout : i)
    }
    setCalendar(newCalendar)
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} onDragStart={onDragStart} onDragCancel={onDragCancel}>
      <div className="grid grid-cols-7 gap-2 px-2 bg-white py-[60px] w-full">
        {Object.entries(calendar).map(([day, workouts], index) => (
            <DroppableColumn key={day} id={day} isDragging={isDragging}>
                <div className="mb-1 flex justify-between">
                    <p className={`text-[11px] font-bold ${dayOfToday === +getCurrentWeekDayNumbers()[index] ? 'text-[#5A57CB]' : 'text-[#728096]'}`}>{getCurrentWeekDayNumbers()[index]}</p>
                    <div className="cursor-pointer" onClick={() => onOpenNewWorkout(day)}>
                    <Image src={PlusIcon} alt="Add Exercise" />
                </div>
                </div>
                {workouts.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} day={day} handleAddMoreExercise={handleAddMoreExercise} />
                ))}
            </DroppableColumn>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4 text-black">Add new workout</h2>
        <p>Workout name</p>
       <input className="border border-[#C5C5C5] rounded p-2 text-black w-full" onChange={(e) => setNewWorkoutName((pre) => ({...pre, name: e.target.value, errorMessage: ''}))} />
      {
        newWorkoutName.errorMessage && (
          <p className="text-red-500">{newWorkoutName.errorMessage}</p>
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
            onClick={onAddNewWorkout}
          >
            Create
          </button>
        </div>
      </Modal>
    </DndContext>
  );
}
