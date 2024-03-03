import { updateUser } from "@/apis/users";
import { editDialogProps } from "@/common";
import { UpdateUserProps } from "@/user";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";

const UsersEditDialog = ({
  isEditOpen,
  closeEditModal,
  currentUserId,
  currentName,
  selectedEmail,
}: editDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserProps>();

  useEffect(() => {
    setValue("name", currentName);
    setValue("userId", currentUserId);
  }, [currentName, currentUserId, setValue]);
  const namePattern = /^[가-힣a-zA-Z]+$/;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const onSubmit = (data: UpdateUserProps) => {
    mutation.mutate({
      userId: data.userId,
      name: data.name,
    });
    closeEditModal();
  };

  return (
    <Transition appear show={isEditOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
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
              <Dialog.Panel className="w-[800px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-start"
                >
                  사용자 수정
                </Dialog.Title>
                <div className="mt-2 flex flex-col">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                      <p>아이디</p>
                      <p>{selectedEmail}</p>
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
                    <div className="flex justify-center gap-5 mt-10">
                      <button
                        type="button"
                        className="w-[70px] h-[40px] bg-gray-100 rounded-lg"
                        onClick={closeEditModal}
                      >
                        <p className="text-black">취소</p>
                      </button>
                      <button
                        type="submit"
                        className="w-[70px] h-[40px] bg-blue-500 rounded-lg"
                      >
                        <p className="text-white">저장</p>
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

export default UsersEditDialog;
