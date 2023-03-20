import { zodResolver } from "@hookform/resolvers/zod";
import NProgress from "nprogress";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { useCreateUserMutation } from "../../redux/userAPI";
import { LoadingButton } from "../shared/LoadingButton";

type ICreateUserProps = {
  setOpenModal: (open: boolean) => void;
};

const createUserSchema = object({
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

export type CreateUserInput = TypeOf<typeof createUserSchema>;

const CreateUser: FC<ICreateUserProps> = ({ setOpenModal }) => {
  const [createUser, { isLoading, isError, error, isSuccess }] =
    useCreateUserMutation();

  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      setOpenModal(false);
      NProgress.done();
    }

    if (isError) {
      setOpenModal(false);
      NProgress.done();
    }
  }, [isLoading]);

  const onSubmitHandler: SubmitHandler<CreateUserInput> = async (data) => {
    createUser(data);
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
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-2">
          <label
            htmlFor="firstname"
            className="block text-gray-700 text-lg mb-2"
          >
            Primeiro Nome
          </label>
          <input
            className="border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none"
            {...methods.register("name.firstname")}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="lastname"
            className="block text-gray-700 text-lg mb-2"
          >
            Último Nome
          </label>
          <input
            className="border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none"
            {...methods.register("name.lastname")}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="username"
            className="block text-gray-700 text-lg mb-2"
          >
            Username
          </label>
          <input
            className="border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none"
            {...methods.register("username")}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="block text-gray-700 text-lg mb-2">
            E-Mail
          </label>
          <input
            type="email"
            className="border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none"
            {...methods.register("email")}
          />
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
            className="border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none"
            {...methods.register("password")}
          />
        </div>

        <LoadingButton loading={false}>Criar Usuário</LoadingButton>
      </form>
    </section>
  );
};

export default CreateUser;
