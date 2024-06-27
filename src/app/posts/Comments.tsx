import { useState, useEffect } from "react";

type commentProps = {
  userId: string | null;
  imageId: number;
};

type Comment = {
  id: number;
  userId: string;
  imageId: number;
  content: string;
  createdAt: string;
  fullName: string;
  profileImageUrl: string;
};

const Comments = ({ userId, imageId }: commentProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `/api/getComments?userId=${userId}&imageId=${imageId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        setError("");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [userId, imageId]);

  if (loading) {
    return <div className="text-white">Loading comments...</div>;
  }

  if (error) {
    return <div className="text-white">Error: {error}</div>;
  }

  return (
    <div className="mt-4">
      <div className="item-center flex justify-center border-t-[0.5px] border-slate-50/10">
        <h1 className="py-1 text-sm font-medium text-white">Comments</h1>
      </div>
      {comments.length > 0 ? (
        <ul className="mt-2">
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2 text-white">
              <div className="flex items-start">
                <div className="mr-2 flex items-center">
                  <img
                    src={comment.profileImageUrl}
                    alt={comment.fullName}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="ml-2 font-bold">{comment.fullName}:</span>
                </div>
                <div className="mt-1">{comment.content}</div>
              </div>
              <div className="mt-1 text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-white">No comments yet.</div>
      )}
    </div>
  );
};

export default Comments;
