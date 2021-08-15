import React from 'react';

export interface ButtonProps {
  text: string;
  variant: "primary" | "secondary";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
  style?: Record<any, string>;
}
