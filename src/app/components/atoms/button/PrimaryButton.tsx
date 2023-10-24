import React, { MouseEvent, ReactNode, memo } from "react";
import { Button } from "../../shadcn/ui/button";

type PrimaryButtonProps = {
  children: ReactNode;
  handleClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  handleClick,
  children,
}) => {
  return <Button onClick={handleClick}>{children}</Button>;
};

export default PrimaryButton;
