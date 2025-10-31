import { TrackForm } from "../ui/track-form";
import { TrackModalView } from "../ui/track-modal";
import { useTrackModal } from "../model/use-track-modal";
import { globalEventEmmiter } from "@/kernel/events";
import { useTracks } from "@/services/track";
import { useFormData } from "../model/use-form-data";
import { useSelectedCellEffect } from "../model/use-track-create-params-effect";

export function AddTrackWithParamsModal() {
  const { trackCreate } = useTracks({ shouldFetch: false });
  const { close, isOpenModal, selectedCell, cellClick } = useTrackModal();
  globalEventEmmiter.useEvent("createTrackWithParams", cellClick);

  const { formData, handleInputChange, setFormData, resetFormData } =
    useFormData();

  const onSubmit = async () => trackCreate(formData).finally(resetFormData);

  useSelectedCellEffect({
    createParams: selectedCell,
    setFormData,
    resetFormData,
  });

  if (!isOpenModal) return null;

  return (
    <TrackModalView title="Add Track to Cell" close={close}>
      <TrackForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={onSubmit}
        onCancel={close}
        submitText="Add Track"
        disabled={{
          date: true,
          task: true,
        }}
      />
    </TrackModalView>
  );
}
