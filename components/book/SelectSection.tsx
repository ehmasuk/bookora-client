import Logo from "../global/Logo";
import { GridBg } from "../ui/GridBg";

function SelectSection() {
  return (
    <div className="w-full h-full absolute right-0 top-0 bg-gray-100 dark:bg-slate-800 grid place-items-center">
      <GridBg>
        <div className="z-10 text-center">
          <div className="flex items-center justify-center mb-8">
            <Logo />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Ready to write your story?</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto">
            Create a new chapter to begin your journey or select an existing section to continue editing your masterpiece.
          </p>
        </div>
      </GridBg>
    </div>
  );
}

export default SelectSection;
