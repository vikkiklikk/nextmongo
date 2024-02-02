import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <Link href="/database">see greetings</Link>
      <Link href="/front">make a new greeting</Link>
      <Link href="/back">edit greetings</Link>
    </>
  );
};

export default Navbar;
