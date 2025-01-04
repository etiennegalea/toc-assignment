import React from 'react';
import Link from "next/link";

const Nav = () => {
  return (
    <nav>
    <Link href="/">Search</Link>
    {' | '}
    <Link href="/savedarticles">Saved Articles</Link>
    </nav>
  );
};

export default Nav;