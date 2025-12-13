import { Button } from "@/components/ui/button";
import { userService } from "@/services/userService";
import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { Edit, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  userData: {
    birthday: string;
  };
  setRefetch: any;
}

const ProfileEdit: React.FC<Props> = ({ userData, setRefetch }) => {
  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        ...userData,
        birthday: userData.birthday ? dayjs(userData.birthday) : null,
      });
    }
  }, []);

  const handleFinish = async (values: any) => {
    const formattedValues = {
      ...values,
      birthday: values.birthday ? values.birthday.format("DD/MM/YYYY") : null,
    };
    setLoading(true);
    try {
      const response = await userService.updateUserDetails(formattedValues);
      if (response?.success) {
        setLoading(false);
        toast.success("Profile updated successfully!");
        setOpen(false);
        setRefetch(true);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="inline-block underline">
        <span
          onClick={() => setOpen(true)}
          className="flex items-center gap-1 md:gap-1 text-sm text-gray-700 font-medium cursor-pointer hover:text-templateText"
        >
          <Edit size={15} />
          Edit details
        </span>
      </div>

      <Modal
        width={400}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
      >
        <div className="space-y-6">
          <h2 className="text-lg text-templateText tracking-wide">
            Update your details
          </h2>
          <Form
            form={form}
            onFinish={handleFinish}
            size="middle"
            layout="vertical"
            className="space-y-3"
          >
            <div className="flex items-center gap-4">
              <Form.Item
                label={
                  <span className="font-normal text-xs tracking-wide">
                    First Name
                  </span>
                }
                name="first_name"
                className="flex-1 mb-0"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={
                  <span className="font-normal text-xs tracking-wide">
                    Last Name
                  </span>
                }
                name="last_name"
                className="flex-1 mb-0"
              >
                <Input />
              </Form.Item>
            </div>

            <div className="flex items-center gap-4">
              <Form.Item
                label={
                  <span className="font-normal text-xs tracking-wide">
                    Email
                  </span>
                }
                name="email"
                className="flex-1 mb-0"
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                ]}
                label={
                  <span className="font-normal text-xs tracking-wide">
                    Phone
                  </span>
                }
                name="phone"
                className="flex-1 mb-0"
              >
                <InputNumber className="w-full" />
              </Form.Item>
            </div>

            {/* <Form.Item
              label={
                <span className="font-normal text-xs tracking-wide">DOB</span>
              }
              name="birthday"
              className="mb-0"
            >
              <DatePicker className="w-full" />
            </Form.Item> */}

            <div className="!mt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader className="animate-spin" />}
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ProfileEdit;
