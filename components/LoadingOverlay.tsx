import Spinner, {
  type SpinnerPropTypes,
} from "react-native-loading-spinner-overlay";

export function LoadingOverlay({
  cancelable,
  overlayColor,
  visible,
  animation,
  ...props
}: SpinnerPropTypes & { visible: boolean }) {
  return (
    <Spinner
      animation={animation ?? "none"}
      cancelable={cancelable ?? false}
      overlayColor={overlayColor ?? "#00000080"}
      visible={visible}
      {...props}
    />
  );
}
