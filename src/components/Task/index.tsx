import { CheckOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { FC } from "react";

import { TaskProps } from "./types";

export const Task: FC<TaskProps> = ({ data }) => {
  return (
    <Card size="small" styles={{ body: { padding: "0.25rem 0.5rem" } }}>
      <div className="mx-1 flex w-full select-none flex-row items-center justify-between">
        <span>{data.task}</span>
        <Button type="text" icon={<CheckOutlined />} />
      </div>
    </Card>
  );
};
