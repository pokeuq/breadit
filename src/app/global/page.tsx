import { db } from "@/lib/db";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { ShieldAlert } from "lucide-react";
import { useSession } from "next-auth/react";
import Post from "@/components/Post";

export default async function Home() {
  const { data: session } = useSession();

  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subreddit: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.length ? (
        posts.map((post, index) => {
          const votesAmt = post.votes.reduce((acc, vote) => {
            if (vote.type === "UP") return acc + 1;
            if (vote.type === "DOWN") return acc - 1;
            return acc;
          }, 0);

          const currentVote = post.votes.find(
            (vote) => vote.userId === session?.user.id
          );

          return (
            <Post
              key={post.id}
              post={post}
              commentAmt={post.comments.length}
              subredditName={post.subreddit.name}
              votesAmt={votesAmt}
              currentVote={currentVote}
            />
          );
        })
      ) : (
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-rose-100 px-6 py-4">
            <p className="text-rose-800 font-semibold py-3 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4" /> No posts
            </p>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-500">
                Currently you are not the owner or subscriber to other
                communities. Create your community or join to others.
              </p>
            </div>
          </dl>
        </div>
      )}
    </ul>
  );
}
