import { useRef, useState } from "react";

interface Props {
  title: string;
  handleSubmit: (title: string) => void;
  className?: string;
}

function TitleAsInput({ title, handleSubmit, className = "" }: Props) {
  const [inputTitle, setInputTitle] = useState<string>(title || '');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const startEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const stopEditing = () => {
    if (inputTitle.trim().length > 0 && inputTitle.trim() !== title) {
      handleSubmit(inputTitle.trim());
    } else {
      setInputTitle(title);
    }
    setIsEditing(false);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    stopEditing();
  };

  return (
    <div className={`group ${className}`}>
      {isEditing ? (
        <form onSubmit={handleFormSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            onBlur={stopEditing}
            className="text-slate-800 dark:text-slate-100 border border-transparent transition rounded px-1 bg-transparent focus:border-slate-800 dark:focus:border-slate-100 focus:outline-none"
          />
        </form>
      ) : (
        <div 
          onClick={startEditing}
          className="cursor-pointer text-slate-800 dark:text-slate-100 truncate transition hover:opacity-80"
          title="Click to edit"
        >
          {inputTitle || "Untitled"}
        </div>
      )}
    </div>
  );
}

export default TitleAsInput;
