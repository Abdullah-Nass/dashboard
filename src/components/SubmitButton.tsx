function SubmitButton({ content }: { content: string }) {
  return (
    <button
      type="submit"
      className="cursor-pointer py-1 bg-yellow-300 shadow rounded-md w-full transition-colors duration-300 hover:bg-yellow-400 active:scale-97"
    >
      {content}
    </button>
  );
}

export default SubmitButton;
