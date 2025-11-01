export type FormDataType = {
    key: string;
    title: string;
    subtitle: string;
    date: string;
};

export interface CreateEditListItemModalProps {
    selectedRow?: FormDataType | undefined;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    setFormValues: (formValues: FormDataType) => void;
}
