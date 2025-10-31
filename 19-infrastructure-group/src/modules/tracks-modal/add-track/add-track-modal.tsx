import { Track } from "../shared/types";
import { TrackForm } from "../shared/track-form";
import { TrackModalView } from "../shared/track-modal";
import { useAddTrackForm } from "./use-add-track-form";
import { useTrackModal } from "../shared/use-track-modal";
import { globalEventEmmiter } from "@/interfaces/events";

export function AddTrackModal({
  trackCreate,
}: {
  trackCreate: (track: Omit<Track, "id">) => Promise<void>;
}) {
  const { close, isOpenModal, createClick } = useTrackModal();
  globalEventEmmiter.useEvent("createClick", createClick);

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
