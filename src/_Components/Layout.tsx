/* eslint-disable */

import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren<{}>) => {
  return (
    <main className="flex h-screen justify-center">
      <div
        className=" h-full w-full 
        overflow-y-scroll  md:max-w-xl lg:max-w-xl"
      >
        {props.children}
      </div>
    </main>
  );
};
