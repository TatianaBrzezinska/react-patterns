import { Track } from "@/tracks-table";
import { TrackForm } from "../shared/track-form";
import { TrackModalView } from "../shared/track-modal";
import { useTrackModalContext } from "../shared/track-modal-context";
import { useAddTrackForm } from "./use-add-track-form";

export function AddTrackModal({
  trackCreate,
}: {
  trackCreate: (track: Omit<Track, "id">) => Promise<void>;
}) {
  const { close, isOpenModal } = useTrackModalContext();

  const { formData, handleInputChange, handleSubmit } = useAddTrackForm({
    trackCreate,
    onSubmit: close,
  });

  if (!isOpenModal) return null;

  return (
    <TrackModalView title="Add Track" close={close}>
      <TrackForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onCancel={close}
        submitText="Add Track"
      />
    </TrackModalView>
  );
}
