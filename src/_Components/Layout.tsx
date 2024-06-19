/* eslint-disable */

import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren<{}>) => {
  return (
    <main className="flex h-screen  justify-center">{props.children}</main>
  );
};
