import { Blogcard } from "./components/blogcard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/slices/Blogslice";
import { useEffect } from "react";

const BlogPage = () => {
  const dispatch = useDispatch();
  const BlogState = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (BlogState.isLoading) {
    return <div>Loading...</div>;
  }

  if (BlogState.isError) {
    return <div>{BlogState.errorMessage}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {BlogState.blogsList.map((blog) => (
        <Blogcard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogPage;
