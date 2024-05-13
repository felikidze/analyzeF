import { enqueueSnackbar } from "notistack";
import { ReactElement, ReactNode, ReactPortal } from "react";

export default (error: { response: { data: { error: string | number | boolean | ReactElement | Iterable<ReactNode> | ReactPortal | null | undefined; }; }; }) =>
  enqueueSnackbar(error.response.data.error, { variant: "error" });