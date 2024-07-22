import classNames from "classnames";

interface Props {
  onClick: () => void;
  type: "add" | "remove";
}

export const Button = ({ onClick, type }: Props) => {
  return (
    <button
      className={classNames("btn btn-circle absolute right-0", {
        "btn-primary": type === "add",
      })}
      type="button"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {type === "add" ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        )}
      </svg>
    </button>
  );
};
