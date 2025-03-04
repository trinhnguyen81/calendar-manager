import { useDroppable } from "@dnd-kit/core";

interface Props {
    id: string;
    children: React.ReactNode;
    isDragging: boolean
}

const DroppableColumn: React.FC<Props> = ({ id, children, isDragging }) => {
 const { isOver, setNodeRef } = useDroppable({ id });
  
  return (
    <div ref={setNodeRef}>
        <p className="text-[#6A7988] font-semibold text-[10px] uppercase mb-2">{id}</p>
        <div className={`group overflow-y-auto scrollbar-hidden hover:scrollbar-visible p-2 bg-[#F3F5F8] rounded-md min-h-svh ${isDragging && 'border-2 border-dashed border-[#5A57CB]'} ${isOver ? '!bg-white' : ''}`}>
            {children}
        </div>
    </div>
  );
} 

export default DroppableColumn