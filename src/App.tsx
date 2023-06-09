import NProgress from "nprogress";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Modal from "./components/shared/modal";
import CreateUser from "./components/users/create.user";
import UserItem from "./components/users/user.component";
import { store } from "./redux/store";
import { useGetAllUsersQuery } from "./redux/userAPI";

function AppContent() {
  const [openModal, setOpenModal] = useState(false);

  const {
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    data: users,
  } = useGetAllUsersQuery(
    { limit: 10 },
    { refetchOnFocus: true, refetchOnReconnect: true }
  );

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (isSuccess) {
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
  }, [loading]);

  return (
    <div className="2xl:max-w-[90rem] max-w-[68rem] mx-auto">
      <div className="m-8 grid grid-cols-[repeat(auto-fill,_320px)] gap-7 grid-rows-[1fr]">
        <div
          onClick={() => setOpenModal(true)}
          className="flex items-center justify-center h-20 w-20 border-2 border-dashed border-blue-600 rounded-full text-blue-600 text-5xl cursor-pointer"
        >
          <i className="bx bx-plus"></i>
        </div>

        <h4 onClick={() => setOpenModal(true)} className="">
          Adicionar novo usuário
        </h4>
      </div>

      {users?.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}

      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <CreateUser setOpenModal={setOpenModal} />
      </Modal>
    </div>
  );
}

function App() {
  return (
    <>
      <Provider store={store}>
        <AppContent />
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
