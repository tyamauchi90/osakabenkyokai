import { FC } from "react";

const CancelPage: FC = () => {
  return (
    <div className="min-h-[300px] flex flex-col justify-center flex-grow">
      <h1>お支払いがキャンセルされました。</h1>
      <p>何か問題が発生したようです。もう一度お試しください。</p>
    </div>
  );
};

export default CancelPage;
