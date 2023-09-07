import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  NumberField,
  Submit,
} from "@redwoodjs/forms";

import type { EditProductById, UpdateProductInput } from "types/graphql";
import type { RWGqlError } from "@redwoodjs/forms";
import { useParams } from "@redwoodjs/router";

type FormProduct = NonNullable<EditProductById["product"]>;

interface ProductFormProps {
  product?: EditProductById["product"];
  onSave: (data: UpdateProductInput, id?: FormProduct["id"]) => void;
  error: RWGqlError;
  loading: boolean;
}

const ProductForm = (props: ProductFormProps) => {
  const params = useParams();

  const onSubmit = (data: FormProduct) => {
    props.onSave(data, props?.product?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormProduct> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.product?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="availability"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Availability
        </Label>

        <CheckboxField
          name="availability"
          defaultChecked={props.product?.availability}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="availability" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.product?.userId || params?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;
