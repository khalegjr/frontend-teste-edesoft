import NProgress from "nprogress";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { IUser } from "../../redux/types";
import { useDeleteUserMutation } from "../../redux/userAPI";
import Modal from "../shared/modal";
import UpdateUser from "./update.user";

type UserItemProps = {
  user: IUser;
};

const UserItem: FC<UserItemProps> = ({ user }) => {
  const [openSettings, setOpenSettings] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [deleteUser, { isLoading, isError, error, isSuccess }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpenModal(false);
      toast.warning("Usuário deletado com sucesso");
      NProgress.done();
    }

    if (isError) {
      setOpenModal(false);
      const err = error as any;
      const resMessage =
        err.data.message || err.data.detail || err.message || err.toString();
      toast.error(resMessage, {
        position: "top-right",
      });
      NProgress.done();
    }
  }, [isLoading]);

  const onDeleteHandler = (userId: string) => {
    if (window.confirm("Tem certeza que deseja excluir o usuário?")) {
      deleteUser(userId);
    }
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-md flex flex-col justify-between overflow-hidden">
        <div className="details">
          <h4 className="mb-2 pb-2 text-2xl font-semibold tracking-tight text-gray-900">
            {user.name.firstname} {user.name.lastname}
          </h4>
          <p className="mb-3 font-normal text-dark-200">
            <span className="font-semibold">Username:</span> {user.username}
          </p>

          <p className="mb-3 font-normal text-dark-200">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
        <div className="relative border-t border-slate-300 flex justify-between items-center">
          <div
            onClick={() => setOpenSettings(!openSettings)}
            className="text-dark-100 text-lg cursor-pointer"
          >
            <i className="bx bx-dots-horizontal-rounded"></i>
          </div>
          <div
            id="settings-dropdown"
            className={twMerge(
              `absolute right-0 bottom-3 z-10 w-28 text-base list-none bg-white rounded divide-y divide-gray-100 shadow`,
              `${openSettings ? "block" : "hidden"}`
            )}
          >
            <ul className="py-1" aria-labelledby="dropdownButton">
              <li
                onClick={() => {
                  setOpenSettings(false);
                  setOpenModal(true);
                }}
                className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <i className="bx bx-pencil"></i> Edit
              </li>
              <li
                onClick={() => {
                  setOpenSettings(false);
                  onDeleteHandler(user.id);
                }}
                className="py-2 px-4 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
              >
                <i className="bx bx-trash"></i> Delete
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <UpdateUser user={user} setOpenModal={setOpenModal} />
      </Modal>
    </>
  );
};

export default UserItem;
