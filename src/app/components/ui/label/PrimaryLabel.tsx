import { ReactNode } from "react";
import { Label } from "../../shadcn/ui/label";

type PrimaryLabelProps = {
  htmlFor: string;
  children: ReactNode;
};

const PrimaryLabel: React.FC<PrimaryLabelProps> = ({ children }) => {
  return <Label className="font-medium mb-2">{children}</Label>;
};

export default PrimaryLabel;
