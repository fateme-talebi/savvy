import { useState, type FC } from "react";
import CreateEditListItemModal from "./CreateEditListItemModal";
import { Button, Popconfirm, Space, Table, type TableColumnProps } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { FormDataType } from "../../types/ListManager/types";

const ListManager: FC = () => {
    const [showCreateListModal, setShowCreateListModal] = useState(false);
    const [formValues, setFormValues] = useState<FormDataType[]>([]);
    const [selectedRow, setSelectedRow] = useState<FormDataType>();

    const createListItem = () => {
        if (selectedRow) {
            setSelectedRow(undefined);
        }
        setShowCreateListModal(true);
    };

    const deleteAllItems = () => {
        setFormValues([]);
    }

    const handleSetFormValues = (newValues: FormDataType) => {
        if (selectedRow) {
            setFormValues((prev) => prev.map((item) =>
                item.key === selectedRow.key ? { ...item, ...newValues } : item
            ));
        } else {
            setFormValues((prev) => [...prev, newValues]);
        }
    };

    const handleEditRow = (row: FormDataType) => {
        setSelectedRow(row);
        setShowCreateListModal(true);
    };

    const handleDeleteRow = (rowKey: string) => {
        setFormValues((prev) => prev.filter((item) => item.key != rowKey));
    };

    const columns: TableColumnProps<FormDataType>[] = [
        {
            dataIndex: 'key',
            hidden: true,
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Sub Title',
            dataIndex: 'subtitle',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_test, row: FormDataType) => {
                return (
                    <Space size={20}>
                        <Button onClick={() => handleEditRow(row)}>Edit</Button>
                        <Popconfirm
                            title="Delete the item"
                            description="Are you sure to delete this item?"
                            onConfirm={() => handleDeleteRow(row.key)}
                            okText="Yes"
                            cancelText="No"
                            icon={<DeleteOutlined />}
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        },
    ];

    return (
        <div style={{ margin: 20 }}>
            <h1>List View</h1>
            <Table
                rowKey={"key"}
                columns={columns}
                dataSource={formValues}
                bordered
            />
            <br />
            <Space size={20}>
                <Button type="primary" onClick={createListItem}>
                    Create List Item
                </Button>
                {formValues.length >= 1 &&
                    <Popconfirm
                        title="Delete all items"
                        description="Are you sure to delete all items?"
                        onConfirm={deleteAllItems}
                        okText="Yes !!"
                        okButtonProps={{ color: 'red' }}
                        cancelText="No"
                        icon={<DeleteOutlined />}
                    >
                        <Button danger>Delete all items !!!</Button>
                    </Popconfirm>
                }
            </Space>
            {showCreateListModal && (
                <CreateEditListItemModal
                    selectedRow={selectedRow}
                    showModal={showCreateListModal}
                    setShowModal={setShowCreateListModal}
                    setFormValues={handleSetFormValues}
                />
            )}
        </div>
    );
};

export default ListManager;