import { useForm } from "react-hook-form";

const ReactHookForm = () => {
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm({
    defaultValues: { email: "", password: "" }, //isDirtyのフラグとして設定
    mode: "onChange", //バリデーションのタイミング設定
    criteriaMode: "all", //複数バリデーション設定
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="App">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="bg-gray-300"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "入力が必須の項目です。",
              },
            })}
          />
          <div>{watch("email")}</div>
          <div>{getValues("email")}</div>
          {errors.email?.type === "required" && (
            <div>入力が必須の項目です。</div>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            {...register("password", {
              required: {
                value: true,
                message: "入力が必須の項目です。",
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "アルファベットのみ入力してください。",
              },
              minLength: {
                value: 8,
                message: "8文字以上入力してください。",
              },
            })}
            type="password"
            className="bg-gray-300"
          />
          {errors.password?.types?.required && (
            <div>{errors.password.types.required}</div>
          )}
          {errors.password?.types?.pattern && (
            <div>{errors.password.types.pattern}</div>
          )}
          {errors.password?.types?.minLength && (
            <div>8文字以上入力してください。</div>
          )}
        </div>
        <button type="submit" disabled={!isDirty || !isValid}>
          ログイン
        </button>
      </form>
    </div>
  );
};

export default ReactHookForm;
