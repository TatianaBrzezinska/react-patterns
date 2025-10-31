import { TrackForm } from "../shared/track-form";
import { TrackModalView } from "../shared/track-modal";
import { useAddTrackForm } from "./use-add-track-form";
import { useTrackModal } from "../shared/use-track-modal";
import { globalEventEmmiter } from "@/kernel/events";
import { useTracks } from "@/services/track";

export function AddTrackModal() {
  const { close, isOpenModal, createClick } = useTrackModal();
  globalEventEmmiter.useEvent("createTrack", createClick);

  const { trackCreate } = useTracks({ shouldFetch: false });

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
