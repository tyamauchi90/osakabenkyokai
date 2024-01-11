import Image from "next/image";
import { WhileInDiv } from "../components/WhileInDiv";

type FlowProps = {
  className?: string;
  src: string;
  alt: string;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
};

const Flow: React.FC<FlowProps> = ({
  className,
  src,
  alt,
  title,
  description,
}) => (
  <WhileInDiv
    className={`md:max-w-[780px] w-full flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 ${className} `}
  >
    <div className="relative w-customFlowImg h-customFlowImg">
      <Image fill className="object-contain" src={src} alt={alt} />
    </div>
    <div className="w-full sm:w-customFlow">
      <h2 className="text-2xl font-semibold tracking-widest text-center sm:text-left mb-4">
        {title}
      </h2>
      {typeof description === "string" ? (
        <p className="leading-loose tracking-wider text-justify">
          {description}
        </p>
      ) : (
        <div className="leading-loose tracking-wider text-justify">
          {description}
        </div>
      )}
    </div>
  </WhileInDiv>
);

export default Flow;
