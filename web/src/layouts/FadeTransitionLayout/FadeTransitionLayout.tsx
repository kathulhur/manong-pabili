import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import useShowing from "src/hooks/useFadeTransition";

type FadeTransitionLayoutProps = {
  children?: React.ReactNode;
};

const FadeTransitionLayout = ({ children }: FadeTransitionLayoutProps) => {
  const isShowing = useShowing();
  return <>
    <Transition
        as={Fragment}
        show={isShowing}
        enter="transition-opacity duration-700"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
      {children}
    </Transition>

  </>;
};

export default FadeTransitionLayout;
