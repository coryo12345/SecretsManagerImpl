// Snackbar Message
export default interface SnackbarMessage {
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string | null | undefined;
  message: string;
}

export const MESSAGE_DURATION = 3000;
