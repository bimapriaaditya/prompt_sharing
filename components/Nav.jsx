"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, []);

  return (
    <nav className="w-full flex-between mb-16 py-3">
      
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image 
          src={'/assets/images/logo.svg'} 
          alt="app-logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <span className="font-bold text-orange-400 text-lg tracking-wider max-md:hidden">Promptopia</span>
      </Link>

      {/* Desktop View  */}
      <div className="sm:flex hidden">
        {
          session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link 
                href='/create-prompt' 
                className="black_btn">
                Create Post
              </Link>
              <button 
                type="button" 
                className="outline_btn"
                onClick={signOut}>
                Sign Out
              </button>
              <Link href='/profile'>
                <Image 
                  src="/assets/images/logo.svg"
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="user-profile"
                />
              </Link>
            </div>
          ) : (
            <>
              {
                providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {signIn(provider.id)}}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </div>

      {/* Mobile View */}
      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div className="flex">
              <Image 
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className="rounded-full cursor-pointer"
                alt="user-profile"
                onClick={() => setToggleDropdown((prev) => !prev)}
              />

              {
                toggleDropdown && (
                  <div className="dropdown">
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown((prev) => !prev)}
                    > 
                      My Profile
                    </Link>
                    <Link
                      href="/create-prompt"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown((prev) => !prev)}
                    > 
                      Create Prompt
                    </Link>
                    <button 
                      type="button"
                      className="black_btn mt-5 w-full"
                      onClick={() => {
                        setToggleDropdown((prev) => !prev);
                        signOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )
              }
            </div>
          ) : (
            <>
              {
                providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {signIn(provider.id)}}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </div>
    </nav>
  );
}

export default Nav;
