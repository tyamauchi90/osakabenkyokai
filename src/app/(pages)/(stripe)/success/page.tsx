import { FC } from "react";

const SuccessPage: FC = () => {
  return (
    <div className="container min-h-[200px] flex flex-col justify-center flex-grow">
      <h1>お支払いが完了しました！</h1>
      <p>
        ご利用いただきありがとうございます。引き続き当サイトをお楽しみください。
      </p>
    </div>
  );
};

export default SuccessPage;
