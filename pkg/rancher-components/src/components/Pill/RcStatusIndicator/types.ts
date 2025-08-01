export type Shape = 'disc' | 'horizontal-bar' | 'vertical-bar';
export type Status = 'info' | 'success' | 'warning' | 'error' | 'unknown' | 'none';

export interface RcStatusIndicatorProps {
  shape: Shape;
  status: Status;
}
