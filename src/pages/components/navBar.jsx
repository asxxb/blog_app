import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchBlogs, postBlogs } from "../../redux/slices/Blogslice";

const NavBar = () => {
  const dispatch = useDispatch();
  const [isOpen, onOpenChange] = React.useState(false);
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
          <Button
            color="primary"
            variant="ghost"
            onClick={() => onOpenChange(true)}
            type="button"
          >
            start
          </Button>
          <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add Blog
                  </ModalHeader>
                  <ModalBody>
                    <form
                      id="add-blog"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const title = e.target.title.value;
                        const description = e.target.description.value;
                        const author = e.target.author.value;
                        onOpenChange(false);
                        await dispatch(
                          postBlogs({
                            title: title,
                            description: description,
                            author: author,
                          })
                        );
                        await dispatch(fetchBlogs());
                      }}
                      className=" flex flex-col gap-2 "
                    >
                      <Input placeholder="Blog Title" name="title" />
                      <Input
                        placeholder="Blog description"
                        name="description"
                      />
                      <Input placeholder="Blog author" name="author" />
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit" form="add-blog">
                      Add Blog
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
