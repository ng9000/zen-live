import { Logo } from "./logo";
import { Actions } from "./actions";

const NavBar = () => {
  return (
    <div className="fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      <Actions />
    </div>
  );
};

export default NavBar;
