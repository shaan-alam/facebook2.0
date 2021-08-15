import Modal from "../Modal";
import useUser from "../../hooks/useUser";
import { useMutation } from "react-query";
import FormInput from "../FormInput";
import { useFormik } from "formik";
import * as api from "../../api";
import Button from "../Button";
import Avatar from "../Avatar";
import { UploadStatusModalProps } from "./types";

const UploadStatusModal = ({ isOpen, setOpen }: UploadStatusModalProps) => {
  const user = useUser();

  const postStatus = async (status: {
    filter: string;
    caption: string;
    image: string;
  }) => {
    try {
      const { data } = await api.createPost(status);

      // Clear form values
      formik.resetForm();

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isLoading, isError, error, isSuccess, mutate } =
    useMutation(postStatus);

  const formik = useFormik({
    initialValues: {
      status: "",
    },
    onSubmit: (values: { status: string }) => {
      // Make a POST request to the backend for creating a new status
      mutate({ caption: values.status, image: "", filter: "" });
    },
  });

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <div className="flex items-center">
        <Avatar className="h-8 w-8 rounded-full" />
        <h4 className="ml-3 font-semibold text-fb">{user?.fullName}</h4>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <FormInput
          as="textarea"
          name="status"
          id="status"
          formik={formik}
          className="p-4 border-2 my-3 rounded-xl w-full focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder={`What's on your mind?, ${user?.fullName}`}
        ></FormInput>
        <Button
          variant="primary"
          isLoading={formik.isSubmitting}
          text="Post"
          disabled={
            isLoading || formik.values.status === "" || !formik.values.status
              ? true
              : false
          }
          className="w-full rounded-md py-2 cursor-pointer"
        />
      </form>
    </Modal>
  );
};

export default UploadStatusModal;
