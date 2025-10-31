import { Track } from "../shared/types";
import { TrackForm } from "../shared/track-form";
import { TrackModalView } from "../shared/track-modal";
import { useUpdateTrackForm } from "./use-update-track-form";
import { useTrackModal } from "../shared/use-track-modal";
import { globalEventEmmiter } from "@/interfaces/events";

export function UpdateTrackModal({
  trackUpdate,
}: {
  trackUpdate: (track: Track) => Promise<void>;
}) {
  const { close, isOpenModal, selectedTrack, trackClick } = useTrackModal();
  globalEventEmmiter.useEvent("trackClick", trackClick);

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
