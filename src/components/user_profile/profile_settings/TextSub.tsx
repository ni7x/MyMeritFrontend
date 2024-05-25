const TextSub = ({ text }: { text?: string }) => {
  if (!text) {
    return null;
  }

  return (
    <span className="truncate break-all break-words whitespace-normal">
      {text}
    </span>
  );
};

export default TextSub;
