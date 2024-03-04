import UserIcon from "@assets/user.svg?react";
// import { ReactComponent as UserIcon } from "@assets/user.svg";
import AuthListBox from "@components/common/AuthListBox";
import { Dialog, Transition } from "@headlessui/react";
import authState from "@recoil/auth/atom";
import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

const Header = () => {
  const location = useLocation();
  const auth = useRecoilValue(authState);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="fixed w-full h-[80px] bg-blue-500 flex justify-between items-center text-white z-10">
      <div className="flex h-full items-center justify-around">
        <div className="px-5">
          <Link to="/">
            <p className="text-white">Wisebirds</p>
          </Link>
        </div>
        <div
          className={`h-full flex items-center px-5 ${
            location.pathname === "/campaigns" && "bg-blue-600"
          }`}
        >
          <Link to="/campaigns">
            <p className="text-white">캠페인</p>
          </Link>
        </div>
        {auth === "admin" && (
          <div
            className={`h-full flex items-center px-5 ${
              location.pathname === "/users" && "bg-blue-600"
            }`}
          >
            <Link to="/users">
              <p className="text-white">사용자</p>
            </Link>
          </div>
        )}
      </div>
      <div className="flex gap-5 items-center h-full pr-5">
        <button
          type="button"
          className={`flex items-center h-full gap-1 px-3 ${
            isOpen && "bg-blue-600"
          }`}
          onClick={openModal}
        >
          <UserIcon />
          <p>abc@abc.com</p>
        </button>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              <div className="flex min-h-full items-start justify-end pr-[240px] pt-20 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 flex justify-center"
                    >
                      홍길동
                    </Dialog.Title>
                    <div className="mt-2 flex flex-col items-center">
                      <p className="text-sm text-gray-500">abc@abc.com</p>
                      <p className="text-sm text-gray-500">와이즈버즈</p>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <AuthListBox />
      </div>
    </div>
  );
};

export default Header;
