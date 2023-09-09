import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  CheckboxField,
  DatetimeLocalField,
  Submit,
} from "@redwoodjs/forms";

import type { EditMarkerById, UpdateMarkerInput } from "types/graphql";
import type { RWGqlError } from "@redwoodjs/forms";

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, "");
  }
};

type FormMarker = NonNullable<EditMarkerById["marker"]>;

interface MarkerFormProps {
  marker?: EditMarkerById["marker"];
  onSave: (data: UpdateMarkerInput, id?: FormMarker["id"]) => void;
  error: RWGqlError;
  loading: boolean;
}

const MarkerForm = (props: MarkerFormProps) => {
  const onSubmit = (data: FormMarker) => {
    props.onSave(data, props?.marker?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormMarker> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="url"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Url
        </Label>

        <TextField
          name="url"
          defaultValue={props.marker?.url}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="url" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.marker?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="deleted"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Deleted
        </Label>

        <CheckboxField
          name="deleted"
          defaultChecked={props.marker?.deleted}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="deleted" className="rw-field-error" />

        <Label
          name="deletedAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Deleted at
        </Label>

        <DatetimeLocalField
          name="deletedAt"
          defaultValue={formatDatetime(props.marker?.deletedAt)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="deletedAt" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default MarkerForm;
