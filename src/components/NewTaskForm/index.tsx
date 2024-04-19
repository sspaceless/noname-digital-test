import { Button, Input } from "antd";
import { useFormik } from "formik";
import { FC } from "react";

import { NewTaskFormProps, NewTaskFormValues } from "./types";

export const NewTaskForm: FC<NewTaskFormProps> = ({ onSubmit }) => {
  const formik = useFormik<NewTaskFormValues>({
    initialValues: {
      task: "",
    },
    onSubmit: (values) => {
      onSubmit(values.task);
      formik.resetForm();
    },
  });

  const isSubmitButtonDisabled = formik.values.task.length <= 0;

  return (
    <div className="flex flex-row gap-2">
      <Input
        id="task"
        value={formik.values.task}
        placeholder="What are you planning to do?"
        onChange={formik.handleChange}
      />
      <Button disabled={isSubmitButtonDisabled} onClick={formik.submitForm}>
        To do
      </Button>
    </div>
  );
};
