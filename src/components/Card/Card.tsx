import React from "react";

type CardElement = "div" | "section" | "form" | "article" | "button";

export interface CardProps extends React.AllHTMLAttributes<HTMLElement> {
  as?: CardElement;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  as: Component = "div",
  hoverable = false,
  className = "",
  type = "button",
  ...props
}) => {
  const elementProps = Component === "button" ? { type, ...props } : props;

  return (
    <Component
      className={`
        bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 w-full
        transition-all duration-200 text-left
        ${hoverable ? "hover:border-indigo-500/35 hover:shadow-2xl" : ""}
        ${className}
      `}
      {...(elementProps as React.HTMLAttributes<HTMLElement>)}
    >
      {children}
    </Component>
  );
};
