interface Props {
  text?: string;
}

export const Alert = ({ text }: Props) => {
  if (!text) return null;

  return <div className="alert alert-error">{text}</div>;
};
