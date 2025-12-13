"use client";
import { Modal, Popover } from "antd";
import { Ellipsis, Loader, Loader2, Pencil, Trash } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  data?: any;
  handleRemoveAddressUpdate: any;
  showModal: any;
}

const RemoveAddress: React.FC<Props> = ({
  data,
  handleRemoveAddressUpdate,
  showModal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removing, setRemoving] = useState(false);

  const content = (
    <div className="min-w-40">
      <p
        onClick={() => showModal(data)}
        className="p-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-all  ease-in-out duration-200 rounded-sm"
      >
        <Pencil size={14} />
        Edit
      </p>
      <p
        onClick={() => setIsModalOpen(true)}
        className="p-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-all  ease-in-out duration-200 rounded-sm"
      >
        <Trash size={14} />
        Remove
      </p>
    </div>
  );

  const handleRemoveAddress = async () => {
    try {
      const id = data.id;
      setRemoving(true);
      const response = await fetch(`${process.env.BACKEND}/api/removeAddress`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(result.error);
      } else {
        setRemoving(false);
        setIsModalOpen(false);
        handleRemoveAddressUpdate(result.addresses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Popover content={content} trigger="hover" placement="bottom">
        <div className="cursor-pointer hover:bg-gray-100  text-sm p-1 rounded-sm">
          <Ellipsis
            size={20}
            className="text-templatePrimary"
            strokeWidth={1.5}
          />
        </div>
      </Popover>
      <Modal
        open={isModalOpen}
        width={350}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="space-y-4">
          <h2 className="text-center text-lg  leading-snug">Are you sure ?</h2>
          <p className="text-center text-xs tracking-wide">
            Removing this address will delete it permanently from your account.
            This action cannot be undone.
          </p>
          <div className="flex items-center justify-center gap-1.5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-templateText border border-templatePrimary text-xs w-full py-2 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleRemoveAddress}
              className="flex items-center justify-center gap-1 border-templateText text-xs border text-templateText w-full py-2"
            >
              {removing && <Loader2 size={14} className="animate-spin" />} Yes
              remove
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RemoveAddress;
