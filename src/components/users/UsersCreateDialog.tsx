import { checkEmailDuplication, postUser } from "@/apis/users";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

const UsersCreateDialog = ({ isCreateOpen, closeCreateModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const emailPattern = /^\S+@\S+\.\S+$/;
  const passwordPattern =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,15}$/;
  const namePattern = /^[가-힣a-zA-Z]+$/;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
    closeCreateModal();
  };

  return (
    <Transition appear show={isCreateOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeCreateModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[800px] h-[600px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-start"
                >
                  사용자 생성
                </Dialog.Title>
                <div className="mt-2 flex flex-col">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                      <label htmlFor="email">아이디</label>
                      <input
                        id="email"
                        {...register("email", {
                          required: true,
                          minLength: 9,
                          maxLength: 49,
                          pattern: emailPattern,
                          validate: async (value) =>
                            (await checkEmailDuplication(value)) &&
                            "이미 사용중인 이메일입니다. 다른 이메일을 입력하세요.",
                        })}
                        className="border border-[1px_black_solid]"
                      />
                      {errors.email?.type === "required" && (
                        <p className="text-[#FF0000]">
                          아이디(이메일)을 입력하세요.
                        </p>
                      )}
                      {errors.email?.type === "minLength" && (
                        <p className="text-[#FF0000]">
                          올바른 이메일 주소를 입력하세요
                        </p>
                      )}
                      {errors.email?.type === "maxLength" && (
                        <p className="text-[#FF0000]">
                          올바른 이메일 주소를 입력하세요
                        </p>
                      )}
                      {errors.email?.type === "pattern" && (
                        <p className="text-[#FF0000]">
                          올바른 이메일 주소를 입력하세요
                        </p>
                      )}
                      {errors.email && (
                        <p className="text-[#FF0000]">
                          {errors?.email?.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="password">비밀번호</label>
                      <input
                        id="password"
                        type="password"
                        {...register("password", {
                          required: true,
                          minLength: 8,
                          maxLength: 15,
                          pattern: passwordPattern,
                        })}
                        className="border border-[1px_black_solid]"
                      />
                      {errors.password?.type === "required" && (
                        <p className="text-[#FF0000]">비밀번호를 입력하세요.</p>
                      )}
                      {errors.password?.type === "minLength" && (
                        <p className="text-[#FF0000]">
                          8~15 자 영문, 숫자, 특수문자를 사용하세요
                        </p>
                      )}
                      {errors.password?.type === "maxLength" && (
                        <p className="text-[#FF0000]">
                          8~15 자 영문, 숫자, 특수문자를 사용하세요
                        </p>
                      )}
                      {errors.password?.type === "pattern" && (
                        <p className="text-[#FF0000]">
                          8~15 자 영문, 숫자, 특수문자를 사용하세요
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="repeat_password">비밀번호 확인</label>
                      <input
                        id="repeat_password"
                        type="password"
                        {...register("repeat_password", {
                          required: true,
                          validate: (value) =>
                            value === password ||
                            "비밀번호가 일치하지 않습니다.",
                        })}
                        className="border border-[1px_black_solid]"
                      />
                      {errors.repeat_password?.type === "required" && (
                        <p className="text-[#FF0000]">비밀번호를 입력하세요.</p>
                      )}
                      {errors.repeat_password && (
                        <p className="text-[#FF0000]">
                          {errors?.repeat_password?.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="name">이름</label>
                      <input
                        id="name"
                        {...register("name", {
                          required: true,
                          minLength: 1,
                          maxLength: 16,
                          pattern: namePattern,
                        })}
                        className="border border-[1px_black_solid]"
                      />
                      {errors.name?.type === "required" && (
                        <p className="text-[#FF0000]">이름을 입력하세요.</p>
                      )}
                      {errors.name?.type === "minLength" && (
                        <p className="text-[#FF0000]">
                          이름을 올바르게 입력하세요. (숫자, 특수문자, 공백
                          입력불가)
                        </p>
                      )}
                      {errors.name?.type === "maxLength" && (
                        <p className="text-[#FF0000]">
                          이름을 올바르게 입력하세요. (숫자, 특수문자, 공백
                          입력불가)
                        </p>
                      )}
                      {errors.name?.type === "pattern" && (
                        <p className="text-[#FF0000]">
                          이름을 올바르게 입력하세요. (숫자, 특수문자, 공백
                          입력불가)
                        </p>
                      )}
                    </div>
                    <div className="flex justify-center mt-10">
                      <button
                        type="button"
                        className="w-[70px] h-[40px] bg-gray-100 m-5 rounded-lg"
                        onClick={closeCreateModal}
                      >
                        <p className="text-black">취소</p>
                      </button>
                      <button
                        type="submit"
                        className="w-[70px] h-[40px] bg-blue-500 m-5 rounded-lg"
                      >
                        <p className="text-white">생성</p>
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UsersCreateDialog;
