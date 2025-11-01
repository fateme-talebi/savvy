import type { FC } from "react";
import { Form, Input, Modal } from 'antd';
import { colSpan, generateUniqueId, getNow } from "../../utils/utils";
import type { CreateEditListItemModalProps, FormDataType } from "../../types/ListManager/types";

const CreateEditListItemModal: FC<CreateEditListItemModalProps> = ({ selectedRow, showModal, setShowModal, setFormValues }) => {
    const [form] = Form.useForm();

    const handleCreateEdit = () => {
        form.validateFields().then((formValues) => {
            setFormValues({
                key: selectedRow ? selectedRow.key : generateUniqueId(),
                date: getNow(),
                ...formValues
            });
            setShowModal(false);
        });
    };

    return (
        <Modal
            title={`${selectedRow ? "Edit" : "Create"} Item`}
            open={showModal}
            onCancel={() => setShowModal(false)}
            onOk={handleCreateEdit}
            okText={selectedRow ? "Edit" : "Create"}
        >
            <Form
                name="create-edit"
                form={form}
                initialValues={selectedRow}
            >
                <Form.Item<FormDataType>
                    label="Title"
                    name="title"
                    {...colSpan}
                    rules={[{ required: true, message: "please enter title" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FormDataType>
                    label="Subtitle"
                    name="subtitle"
                    {...colSpan}
                    rules={[{ required: true, message: "please enter subtitle" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateEditListItemModal;