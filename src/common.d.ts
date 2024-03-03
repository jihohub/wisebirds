export interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  pages: number;
}

export interface createDialogProps {
  isCreateOpen: boolean;
  closeCreateModal: () => void;
}

export interface editDialogProps {
  isEditOpen: boolean;
  closeEditModal: () => void;
  currentUserId: number;
  currentName: string;
  selectedEmail: string;
}

export interface errorDialogProps {
  isErrorOpen: boolean;
  closeErrorModal: () => void;
}
