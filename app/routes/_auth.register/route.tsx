/* eslint-disable jsx-a11y/label-has-associated-control */

export default function RegisterPage() {
  return (
    <div>
      <h2>メールアドレスで新規登録</h2>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">E-Mail</span>
        </div>
        <input type="text" className="input input-bordered w-full max-w-xs" />
      </label>
    </div>
  );
}
