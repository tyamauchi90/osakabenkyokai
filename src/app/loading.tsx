export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full border-t-4 border-r-4 border-b-4 border-orange-400 h-16 w-16"></div>

      {/* <Progress value={33} /> */}
    </div>
  );
}
