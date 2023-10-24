import { Input } from "../../shadcn/ui/input";

type PrimaryInputProps = {
  type: string;
  id: string;
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PrimaryInput: React.FC<PrimaryInputProps> = ({ handleChange }) => {
  return <Input onChange={handleChange} />;
};

export default PrimaryInput;
