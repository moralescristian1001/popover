export const DEFAULT_DIALOG_CONFIG: DialogConfig = {
  showCloseButton: false,
  data: null,
  maxWidth: '80vw',
  maxHeight: '80vh',
};

export const DEFAULT_POPOVER_CONFIG: DialogConfig = {
  origin : null,
  showCloseButton: true,
  data: null,
  maxWidth: '40vw',
  maxHeight: '40vh',
  hasBackdrop: false
};

export class DialogConfig<D = any> {
  position?: string;
  backdropClass?: string;
  origin?: HTMLElement;
  header?: string;
  showCloseButton?: boolean;
  data?: D | null;
  hasBackdrop?: boolean;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string = '80vw';
  maxHeight?: number | string = '80vh';
}
