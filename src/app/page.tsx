import { currentUser } from "@clerk/nextjs/server";
import { getDbUserId } from "@/actions/user.actions";
import { getPosts } from "@/actions/post.actions";
import CreatePost from "@/components/forum/CreatePost";
import PostCard from "@/components/forum/PostCard";
import WhoToFollow from "@/components/forum/WhoToFollow";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  return (
    // Forum
    <section className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>
      </div>

      <aside className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow />
      </aside>
    </section>
  );
}
