import { errorDialogProps } from "@/common";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ErrorDialog = ({ isErrorOpen, closeErrorModal }: errorDialogProps) => {
  return (
    <Transition appear show={isErrorOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeErrorModal}>
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
              <Dialog.Panel className="w-[500px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-start"
                >
                  에러가 발생했습니다.
                  <br />
                  같은 현상이 반복되면 고객센터로 문의 바랍니다.
                </Dialog.Title>
                <div className="mt-2 flex flex-col items-start">
                  <p className="text-sm text-gray-500">* 고객센터</p>
                  <p className="text-sm text-gray-500">
                    - email: helpdesk@wisebirds.ai
                  </p>
                </div>
                <div className="flex justify-end gap-5 mt-10">
                  <button
                    type="button"
                    className="w-[70px] h-[40px] bg-blue-500 m-5 rounded-lg"
                    onClick={closeErrorModal}
                  >
                    <p className="text-white">확인</p>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ErrorDialog;
