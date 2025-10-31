import { Track } from "../../App";
import { TrackForm } from "../shared/track-form";
import { TrackModalView } from "../shared/track-modal";
import { useTrackModalContext } from "../shared/track-modal-context";
import { useUpdateTrackForm } from "./use-update-track-form";

export function UpdateTrackModal({
  trackUpdate,
}: {
  trackUpdate: (track: Track) => Promise<void>;
}) {
  const { close, isOpenModal, selectedTrack } = useTrackModalContext();

  const { formData, handleInputChange, handleSubmit } = useUpdateTrackForm({
    selectedTrack,
    trackUpdate,
    onSubmit: close,
  });

  if (!isOpenModal) return null;

  return (
    <TrackModalView title="Update Track" close={close}>
      <TrackForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onCancel={close}
      />
    </TrackModalView>
  );
}
