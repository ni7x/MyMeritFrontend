const Label = ({
  label,
  value,
}: {
  label: string;
  value: string | JSX.Element;
}) => {
  return (
    <div className="text-main-lighter">
      <p className="text-xs font-medium">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  );
};

export default Label;
