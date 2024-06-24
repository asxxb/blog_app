import { Button } from "@nextui-org/button";
import { PropTypes } from "prop-types";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteBlogs,
  fetchBlogs,
  updateBlogs,
} from "../../redux/slices/Blogslice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import React from "react";
export const Blogcard = ({ blog }) => {
  const [isOpen, onOpenChange] = React.useState(false);
  const dispatch = useDispatch();
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-2">
      <div className="block p-6 bg-white rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {blog.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {blog.description}
        </p>
        <p className="font-small  m-2   text-white dark:text-white-400">
          {blog.author}
        </p>
        <div className="flex gap-2">
          <Button
            color="secondary"
            variant="ghost"
            onClick={() => onOpenChange(true)}
          >
            <MdOutlineEdit />
          </Button>
          <Button
            onClick={async () => {
              await dispatch(deleteBlogs(blog.id));
              await dispatch(fetchBlogs());
            }}
            color="danger"
            variant="ghost"
          >
            <MdOutlineDelete />
          </Button>
        </div>
      </div>

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Blog
              </ModalHeader>
              <ModalBody>
                <form
                  id="update-blog"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const title = e.target.title.value;
                    const description = e.target.description.value;
                    const author = e.target.author.value;
                    onOpenChange(false);
                    await dispatch(
                      updateBlogs({
                        title: title,
                        description: description,
                        author: author,
                        id: blog.id,
                      })
                    );
                    await dispatch(fetchBlogs());
                  }}
                  className=" flex flex-col gap-2 "
                >
                  <Input
                    placeholder="Blog Title"
                    name="title"
                    defaultValue={blog.title}
                  />
                  <Input
                    placeholder="Blog description"
                    name="description"
                    defaultValue={blog.description}
                  />
                  <Input
                    placeholder="Blog author"
                    name="author"
                    defaultValue={blog.author}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" form="update-blog">
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
Blogcard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.string,
  }),
};
