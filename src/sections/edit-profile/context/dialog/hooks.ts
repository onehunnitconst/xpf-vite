import { useContext } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { EditProfileViewDialogContext } from "./context";

import type { CardAddDialogStore } from "../../store/CardAddDialogStore";
import type { CardEditDialogStore } from "../../store/CardEditDialogStore";
import type { CardDeleteDialogStore } from "../../store/CardDeleteDialogStore";

function useCardAddDialog(): CardAddDialogStore;

// selector를 사용하는 경우 - 선택된 부분만 반환
function useCardAddDialog<U>(selector: (state: CardAddDialogStore) => U): U;

function useCardAddDialog<U>(
  selector?: (state: CardAddDialogStore) => U
): CardAddDialogStore | U {
  const context = useContext(EditProfileViewDialogContext);

  if (!context) {
    throw new Error(
      "useCardAddDialog must be used within a EditProfileViewDialogContextProvider"
    );
  }

  if (!selector) {
    return useStore(context.cardAdd);
  }

  return useStore(context.cardAdd, useShallow(selector));
}

/* --------------------------------- */

function useCardEditDialog(): CardEditDialogStore;

// selector를 사용하는 경우 - 선택된 부분만 반환
function useCardEditDialog<U>(selector: (state: CardEditDialogStore) => U): U;

function useCardEditDialog<U>(
  selector?: (state: CardEditDialogStore) => U
): CardEditDialogStore | U {
  const context = useContext(EditProfileViewDialogContext);

  if (!context) {
    throw new Error(
      "useCardEditDialog must be used within a EditProfileViewDialogContextProvider"
    );
  }

  if (!selector) {
    return useStore(context.cardEdit);
  }

  return useStore(context.cardEdit, useShallow(selector));
}

/* --------------------------------- */

function useCardDeleteDialog(): CardDeleteDialogStore;

function useCardDeleteDialog<U>(selector: (state: CardDeleteDialogStore) => U): U;

function useCardDeleteDialog<U>(
  selector?: (state: CardDeleteDialogStore) => U
): CardDeleteDialogStore | U {
  const context = useContext(EditProfileViewDialogContext);

  if (!context) {
    throw new Error(
      "useCardDeleteDialog must be used within a EditProfileViewDialogContextProvider"
    );
  }

  if (!selector) {
    return useStore(context.cardDelete);
  }

  return useStore(context.cardDelete, useShallow(selector));
}

export { useCardAddDialog, useCardEditDialog, useCardDeleteDialog };

