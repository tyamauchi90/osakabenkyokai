import { Progress } from "./components/shadcn/ui/progress";

export default function Loading() {
  console.log("Loading");
  return (
    <div className="flex justify-center">
      <Progress value={33} />
      {/* <div className="animate-spin rounded-full border-t-4 border-r-4 border-b-4 border-orange-400 h-16 w-16"></div> */}
    </div>
  );
}
