import { TrackForm } from "../ui/track-form";
import { TrackModalView } from "../ui/track-modal";
import { useTrackModal } from "../model/use-track-modal";
import { globalEventEmmiter } from "@/kernel/events";
import { useTracks } from "@/services/track";
import { useFormData } from "../model/use-form-data";

export function AddTrackModal() {
  const { close, isOpenModal, createClick } = useTrackModal();
  globalEventEmmiter.useEvent("createTrack", createClick);

  const { trackCreate } = useTracks({ shouldFetch: false });

  const { formData, handleInputChange, resetFormData } = useFormData();
  const onSubmit = async () => trackCreate(formData).finally(resetFormData);

  if (!isOpenModal) return null;

  return (
    <TrackModalView title="Add Track" close={close}>
      <TrackForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={onSubmit}
        onCancel={close}
        submitText="Add Track"
      />
    </TrackModalView>
  );
}
