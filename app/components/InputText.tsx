/* eslint-disable jsx-a11y/label-has-associated-control */

interface Props {
  label?: string;
  name: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
}

export const InputText = ({ label, name, type = "text" }: Props) => {
  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        name={name}
        type={type}
        className="input input-bordered w-full"
        required
      />
    </label>
  );
};
