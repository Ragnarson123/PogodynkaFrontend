"use client";
import React from "react";
import Link from "next/link";
import { styles } from "@/styles";
import { usePathname } from "next/navigation";
import OuterContainer from "@/components/OuterContainer";
import LinedButtons from "@/components/LinedButtons";
import ActiveIndicator from "@/components/ActiveIndicator";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";


const Navigation = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  const pathLinks = [
    { pathname: "/", name: "Weather" },
    ...(!isLoggedIn ? [{ pathname: "/auth", name: "Authorization" }] : []),
  ];

  return (
    <OuterContainer
      className={`flex md:flex-row flex-col md:gap-0 gap-3 justify-between items-center py-3`}
    >
      <div className={`md:absolute lg:left-8 left-4`}>
        <Link href={"/"} className={`text-2xl ${styles.textDefault}`}>
          Pogodynka
        </Link>
      </div>
      <LinedButtons
        className={`${styles.bodyBgColor} sm:mx-auto`}
        items={pathLinks}
        render={(link) => (
          <ActiveIndicator
            key={link.name}
            layoutId={"navigationActiveLink"}
            active={pathname.startsWith(link.pathname)}
          >
            <Link className={`${styles.textDefault}`} href={link.pathname}>
              {link.name}
            </Link>
          </ActiveIndicator>
        )}
      />
      <div className="md:absolute lg:right-8 right-4 flex items-center gap-4">
        {isLoggedIn && (
            <div className="py-1 px-3 rounded-lg hover:bg-gray-100 transition-colors">
              <button
                  onClick={handleLogout}
                  className={`${styles.textDefault} font-medium`}
              >
                Log Out
              </button>
            </div>
        )}

        <div className={"md:block hidden"}>
          <div className={"rounded-full bg-neutral-100 w-10 aspect-square"}></div>
        </div>
      </div>
    </OuterContainer>
  );
};

export default Navigation;
