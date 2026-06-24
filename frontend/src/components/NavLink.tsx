import { NavLink as RouterNavLink } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import clsx from "clsx";

export default function NavLink({
  className,
  children,
  ...props
}: Omit<LinkProps, "className"> & { className?: string }) {
  return (
    <RouterNavLink
      className={({ isActive }) =>
        clsx(
          "rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100",
          className,
        )
      }
      end={props.to === "/dashboard"}
      {...props}
    >
      {children}
    </RouterNavLink>
  );
}
