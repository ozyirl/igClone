const Comments = () => {
  const comments = [
    "this is a comment nigga",
    "this is a comment nigga",
    "this is a comment nigga",
  ];

  return (
    <>
      {comments.map((comment) => (
        <div className="item-center flex justify-center border-t-[0.5px] border-slate-50/10">
          <h1 className="py-1 text-sm font-medium text-white">{comment}</h1>
        </div>
      ))}
    </>
  );
};

export default Comments;
