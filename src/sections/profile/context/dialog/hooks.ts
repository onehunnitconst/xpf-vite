import { useContext } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { ProfileViewDialogContext } from "./context";

import type { CardDetailDialogStore } from "../../store/CardDetailDialogStore";

function useCardDetailDialog(): CardDetailDialogStore;

// selector를 사용하는 경우 - 선택된 부분만 반환
function useCardDetailDialog<U>(
  selector: (state: CardDetailDialogStore) => U
): U;

function useCardDetailDialog<U>(
  selector?: (state: CardDetailDialogStore) => U
): CardDetailDialogStore | U {
  const context = useContext(ProfileViewDialogContext);

  if (!context) {
    throw new Error(
      "useCardDetailDialog must be used within a ProfileViewDialogContextProvider"
    );
  }

  if (!selector) {
    return useStore(context.cardDetail);
  }

  return useStore(context.cardDetail, useShallow(selector));
}

export default useCardDetailDialog;
