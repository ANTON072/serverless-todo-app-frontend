/* eslint-disable jsx-a11y/label-has-associated-control */
export default function ResetPassword() {
  return (
    <form>
      <h2 className="font-bold text-xl">パスワード再発行</h2>
      <label className="form-control w-full mt-3">
        <div className="label">
          <span className="label-text">メールアドレス</span>
        </div>
        <input type="text" className="input input-bordered w-full" />
      </label>
      <button type="submit" className="btn btn-primary w-full mt-5">
        再発行
      </button>
    </form>
  );
}
