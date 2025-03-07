"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

import { ReactNode } from "react";

export default function ReduxProviders({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
