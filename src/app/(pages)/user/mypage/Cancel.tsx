// import { Button } from "@/app/components/shadcn/ui/button";
// import { useToast } from "@/app/components/shadcn/ui/use-toast";
// import { postType } from "@/app/type/postType";
// import { useRouter } from "next/navigation";
// import { FC, useState } from "react";

// // type IdType = {
// //   id: string;
// // };

// const Cancel: FC<postType> = ({ post }) => {
//   const [loading, setLoading] = useState(false);
//   // const user = useAuthCurrentUser();
//   const router = useRouter();
//   const { toast } = useToast();

//   const handleCancel = async () => {
//     setLoading(true);

//     try {
//       // const id = params.id;

//       // // 仮予約データが存在するかチェック
//       const _res = await fetch(`/circle/event/api/${id}/findUserId`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id,
//           user,
//           userName: formData.name,
//         }),
//       });

//       if (!_res.ok) {
//         const errorText = await _res.text(); // エラーの詳細を取得
//         console.error(
//           `サーバーからの応答が正常ではありません。エラー内容: ${errorText}`
//         );
//         throw new Error("サーバーからの応答が正常ではありません。");
//       }

//       // overwriteの条件分岐
//       const _result = await _res.json();
//       const existingApplicationDocData = _result.existingApplicationDocData;
//       let overwrite = false;
//       if (_result.exists) {
//         overwrite = confirm("すでに仮予約されています。上書きしますか？"); // ToDo:alert Dialogの使用を検討
//         if (!overwrite) {
//           form.reset();
//           setLoading(false);
//           router.push(`/circle/event/${id}/`);
//           return;
//         }
//       }

//       const res = await fetch(`/circle/event/api/${id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id,
//           user,
//           userName: formData.name,
//           existingApplicationDocData,
//           overwrite,
//         }),
//       });

//       if (!res.ok) {
//         const errorText = await res.text(); // エラーの詳細を取得
//         console.error(
//           `サーバーからの応答が正常ではありません。エラー内容: ${errorText}`
//         );
//         throw new Error("サーバーからの応答が正常ではありません。");
//       }

//       setLoading(false);
//       router.push("/user/mypage/");
//       toast({
//         title: "参加申込みを完了しました",
//         description: "申込み内容に間違いがないか再度ご確認ください。",
//       });
//     } catch (error: any) {
//       console.error("勉強会への参加申込み中にエラーが発生しました: ", error);
//       alert(`サーバーエラー: ${error?.message}`);
//     }

//     await handleCancel();
//   };

//   return (
//     <>
//       <Button
//         className={`w-28 ${(loading && "opacity-50 cursor-not-allowed") || ""}`}
//       >
//         {loading ? (
//           <div className="animate-spin rounded-full border-t-2 border-r-2 border-b-2 border-white h-6 w-6"></div>
//         ) : (
//           "キャンセル"
//         )}
//       </Button>
//     </>
//   );
// };

// export default Cancel;
