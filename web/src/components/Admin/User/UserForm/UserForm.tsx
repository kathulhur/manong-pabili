import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  CheckboxField,
  Submit,
  PasswordField,
} from "@redwoodjs/forms";

import type { EditUserById, UpdateUserInput } from "types/graphql";
import type { RWGqlError } from "@redwoodjs/forms";

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, "");
  }
};

type FormUser = NonNullable<EditUserById["user"]>;

interface UserFormProps {
  user?: EditUserById["user"];
  onSave: (data: UpdateUserInput, id?: FormUser["id"]) => void;
  error: RWGqlError;
  loading: boolean;
}

const UserForm = (props: UserFormProps) => {
  const onSubmit = (data: FormUser) => {
    props.onSave(data, props?.user?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormUser> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="username"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Username
        </Label>

        <TextField
          name="username"
          defaultValue={props.user?.username}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="username" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.user?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="gender"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Gender
        </Label>

        <TextField
          name="gender"
          defaultValue={props.user?.gender}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="gender" className="rw-field-error" />

        <Label
          name="mobileNumber"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Mobile number
        </Label>

        <TextField
          name="mobileNumber"
          defaultValue={props.user?.mobileNumber}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="mobileNumber" className="rw-field-error" />

        <FieldError name="longitude" className="rw-field-error" />

        <Label
          name="roles"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Roles
        </Label>

        <TextField
          name="roles"
          defaultValue={props.user?.roles}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="roles" className="rw-field-error" />

        <Label
          name="verified"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Verified
        </Label>

        <CheckboxField
          name="verified"
          defaultChecked={props.user?.verified}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="verified" className="rw-field-error" />

        <Label
          name="markerUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Marker url
        </Label>

        <TextField
          name="markerUrl"
          defaultValue={props.user?.markerUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="markerUrl" className="rw-field-error" />


        { !props?.user && (
            <>
              <Label
                name="password"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                password
              </Label>

              <PasswordField
                name="password"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
              />

              <FieldError name="password" className="rw-field-error" />
            </>
          )
        }

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default UserForm;
