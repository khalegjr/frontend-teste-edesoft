import { zodResolver } from "@hookform/resolvers/zod";
import NProgress from "nprogress";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { object, string, TypeOf } from "zod";
import { IUser } from "../../redux/types";
import { useUpdateUserMutation } from "../../redux/userAPI";
import { LoadingButton } from "../shared/LoadingButton";

type IUpdateUserProps = {
  user: IUser;
  setOpenModal: (open: boolean) => void;
};

const updateUserSchema = object({
  email: string().trim().email("Email precisa ser valido."),
  username: string()
    .trim()
    .min(3, "O username deve ter no mínimo 3 caracteres"),
  password: string()
    .trim()
    .min(6, "O tamanho mínimo da senha é de 6 caracteres"),
  name: object({
    firstname: string().trim().min(1, "Primeiro nome é requerido"),
    lastname: string().trim().min(1, "Ultimo nome é requerido"),
  }),
});

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;

const UpdateUser: FC<IUpdateUserProps> = ({ user, setOpenModal }) => {
  const [updateUser, { isLoading, isError, error, isSuccess }] =
    useUpdateUserMutation();

  const methods = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (user) {
      methods.reset(user);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setOpenModal(false);
      toast.success("Usuário atualizado com sucesso");
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

  const onSubmitHandler: SubmitHandler<UpdateUserInput> = async (data) => {
    updateUser({ id: user.id, user: data });
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
        <h2 className="text-2xl font-semibold">Criar Usuário</h2>

        <div
          onClick={() => setOpenModal(false)}
          className="text-2xl text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center cursor-pointer"
        >
          <i className="bx bx-x"></i>
        </div>
      </div>{" "}
      <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-2">
          <label
            htmlFor="firstname"
            className="block text-gray-700 text-lg mb-2"
          >
            Primeiro Nome
          </label>
          <input
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
              `${errors.name?.firstname && "border-red-500"}`
            )}
            {...methods.register("name.firstname")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors.name?.firstname && "visible"}`
            )}
          >
            {errors.name?.firstname?.message as string}
          </p>
        </div>

        <div className="mb-2">
          <label
            htmlFor="lastname"
            className="block text-gray-700 text-lg mb-2"
          >
            Último Nome
          </label>
          <input
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
              `${errors.name?.lastname && "border-red-500"}`
            )}
            {...methods.register("name.lastname")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors.name?.lastname && "visible"}`
            )}
          >
            {errors.name?.lastname?.message as string}
          </p>
        </div>

        <div className="mb-2">
          <label
            htmlFor="username"
            className="block text-gray-700 text-lg mb-2"
          >
            Username
          </label>
          <input
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
              `${errors["username"] && "border-red-500"}`
            )}
            {...methods.register("username")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors["username"] && "visible"}`
            )}
          >
            {errors["username"]?.message as string}
          </p>
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="block text-gray-700 text-lg mb-2">
            E-Mail
          </label>
          <input
            type="email"
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
              `${errors["email"] && "border-red-500"}`
            )}
            {...methods.register("email")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors["email"] && "visible"}`
            )}
          >
            {errors["email"]?.message as string}
          </p>
        </div>

        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-gray-700 text-lg mb-2"
          >
            Password
          </label>
          <input
            type="password"
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
              `${errors["password"] && "border-red-500"}`
            )}
            {...methods.register("password")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors["password"] && "visible"}`
            )}
          >
            {errors["password"]?.message as string}
          </p>
        </div>

        <LoadingButton loading={false}>Atualizar Usuário</LoadingButton>
      </form>
    </section>
  );
};

export default UpdateUser;
