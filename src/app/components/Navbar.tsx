import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <Link href="/database">see posts</Link>
      <Link href="/front">make a new post</Link>
      <Link href="/back">edit posts</Link>
    </>
  );
};

export default Navbar;
