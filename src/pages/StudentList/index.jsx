import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Tag, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';
import { createStudent, deleteStudent, getStudentsList } from '@/services/students';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await createStudent(fields);
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};
/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('Configuring');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};
/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    hide();
    await selectedRows.map(async (row) => await deleteStudent(row.id));
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const intl = useIntl();
  const columns = [
    {
      title: (
        <FormattedMessage id="pages.searchTable.title.studentLrn" defaultMessage="Student LRN" />
      ),
      dataIndex: 'student_lrn',
      tip: "The student's lrn is unique",
      hideInDescriptions: true,
      fixed: 'left',
      defaultSortOrder: 'ascend',
      sorter: true,
      width: 150,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.title.firstName" defaultMessage="First name" />
      ),
      dataIndex: 'first_name',
      valueType: 'textarea',
      sorter: true,
      width: 150,
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.title.middleName" defaultMessage="Middle name" />
      ),
      dataIndex: 'middle_name',
      valueType: 'textarea',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="pages.searchTable.title.lastName" defaultMessage="Last name" />,
      dataIndex: 'last_name',
      valueType: 'textarea',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="pages.searchTable.title.age" defaultMessage="Age" />,
      dataIndex: 'age',
      valueType: 'textarea',
      width: 50,
      sorter: true,
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.title.yearLevel" defaultMessage="Year level" />
      ),
      width: 150,
      dataIndex: 'year_level',
      sorter: true,
      valueEnum: {
        '1ST YEAR': {
          text: intl.formatMessage({
            id: 'pages.searchTable.yearLevel.1stYear',
            defaultMessage: '1ST YEAR',
          }),
        },
        '2ND YEAR': {
          text: intl.formatMessage({
            id: 'pages.searchTable.yearLevel.2ndYear',
            defaultMessage: '2ND YEAR',
          }),
        },
        '3RD YEAR': {
          text: intl.formatMessage({
            id: 'pages.searchTable.yearLevel.3rdYear',
            defaultMessage: '3RD YEAR',
          }),
        },
        '4TH YEAR': {
          text: intl.formatMessage({
            id: 'pages.searchTable.yearLevel.4thYear',
            defaultMessage: '4TH YEAR',
          }),
        },
      },
      render: (dom, entity) => {
        if (entity.year_level === '1ST YEAR') {
          return (
            <Tag color="orange">
              {intl.formatMessage({
                id: 'pages.searchTable.yearLevel.1stYear',
                defaultMessage: '1ST YEAR',
              })}
            </Tag>
          );
        } else if (entity.year_level === '2ND YEAR') {
          return (
            <Tag color="cyan">
              {intl.formatMessage({
                id: 'pages.searchTable.yearLevel.2ndYear',
                defaultMessage: '2ND YEAR',
              })}
            </Tag>
          );
        } else if (entity.year_level === '3RD YEAR') {
          return (
            <Tag color="green">
              {intl.formatMessage({
                id: 'pages.searchTable.yearLevel.3rdYear',
                defaultMessage: '3RD YEAR',
              })}
            </Tag>
          );
        } else if (entity.year_level === '4TH YEAR') {
          return (
            <Tag color="blue">
              {' '}
              {intl.formatMessage({
                id: 'pages.searchTable.yearLevel.4thYear',
                defaultMessage: '4TH YEAR',
              })}
            </Tag>
          );
        }
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.title.section" defaultMessage="Section" />,
      dataIndex: 'section',
      valueType: 'textarea',
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.title.actions" defaultMessage="Actions" />,
      valueType: 'option',
      fixed: 'right',
      width: 100,
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.actions.edit" defaultMessage="Edit" />
        </a>,
        <Popconfirm
          key="delete"
          title={intl.formatMessage({
            id: 'pages.searchTable.areYouSure',
            defaultMessage: 'Are you sure?',
          })}
          okText={intl.formatMessage({
            id: 'pages.searchTable.yes',
            defaultMessage: 'Yes',
          })}
          cancelText={intl.formatMessage({
            id: 'pages.searchTable.no',
            defaultMessage: 'No',
          })}
          onConfirm={() => {
            handleRemove([record]);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          <a href="#">
            <FormattedMessage id="pages.searchTable.actions.delete" defaultMessage="Delete" />
          </a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        scroll={{ x: 1000 }}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={getStudentsList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            console.log({ selectedRows });
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Popconfirm
            key="delete"
            title={intl.formatMessage({
              id: 'pages.searchTable.areYouSure',
              defaultMessage: 'Are you sure?',
            })}
            okText={intl.formatMessage({
              id: 'pages.searchTable.yes',
              defaultMessage: 'Yes',
            })}
            cancelText={intl.formatMessage({
              id: 'pages.searchTable.no',
              defaultMessage: 'No',
            })}
            onConfirm={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            {/* <a href="#">
              <FormattedMessage id="pages.searchTable.actions.delete" defaultMessage="Delete" />
            </a> */}

            <Button
              type="primary"
              danger
              // onClick={async () => {
              //   await handleRemove(selectedRowsState);
              //   setSelectedRows([]);
              //   actionRef.current?.reloadAndRest?.();
              // }}
            >
              <FormattedMessage
                id="pages.searchTable.batchDeletion"
                defaultMessage="Batch deletion"
              />
            </Button>
          </Popconfirm>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="student_lrn"
          label={intl.formatMessage({
            id: 'pages.searchTable.form.studentLrn',
            defaultMessage: 'Student LRN',
          })}
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="first_name"
          label={intl.formatMessage({
            id: 'pages.searchTable.form.firstName',
            defaultMessage: 'First name',
          })}
        />
        <ProFormText
          width="md"
          name="middle_name"
          label={intl.formatMessage({
            id: 'pages.searchTable.form.middleName',
            defaultMessage: 'Middle name',
          })}
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="last_name"
          label={intl.formatMessage({
            id: 'pages.searchTable.form.lastName',
            defaultMessage: 'Last name',
          })}
        />
        <ProFormDigit
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="age"
          label={intl.formatMessage({
            id: 'pages.searchTable.form.age',
            defaultMessage: 'Age',
          })}
        />
        <ProFormSelect
          name="year_level"
          label={intl.formatMessage({
            id: 'pages.searchTable.form.yearLevel',
            defaultMessage: 'Year level',
          })}
          width="md"
          valueEnum={{
            '1ST YEAR': {
              text: intl.formatMessage({
                id: 'pages.searchTable.yearLevel.1stYear',
                defaultMessage: '1ST YEAR',
              }),
            },
            '2ND YEAR': {
              text: intl.formatMessage({
                id: 'pages.searchTable.yearLevel.2ndYear',
                defaultMessage: '2ND YEAR',
              }),
            },
            '3RD YEAR': {
              text: intl.formatMessage({
                id: 'pages.searchTable.yearLevel.3rdYear',
                defaultMessage: '3RD YEAR',
              }),
            },
            '4TH YEAR': {
              text: intl.formatMessage({
                id: 'pages.searchTable.yearLevel.4thYear',
                defaultMessage: '4TH YEAR',
              }),
            },
          }}
          rules={[{ required: true }]}
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="section"
          label={intl.formatMessage({
            id: 'pages.searchTable.form.section',
            defaultMessage: 'Section',
          })}
        />
      </ModalForm>
      {/* <UpdateForm */}

      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="student_lrn"
          label={intl.formatMessage({
            id: 'pages.searchTable.form.studentLrn',
            defaultMessage: 'Student LRN',
          })}
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="first_name"
          label={intl.formatMessage({
            id: 'pages.searchTable.form.firstName',
            defaultMessage: 'First name',
          })}
        />
        <ProFormText
          width="md"
          name="middle_name"
          label={intl.formatMessage({
            id: 'pages.searchTable.form.middleName',
            defaultMessage: 'Middle name',
          })}
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="last_name"
          label={intl.formatMessage({
            id: 'pages.searchTable.form.lastName',
            defaultMessage: 'Last name',
          })}
        />
        <ProFormDigit
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="age"
          label={intl.formatMessage({
            id: 'pages.searchTable.form.age',
            defaultMessage: 'Age',
          })}
        />
        <ProFormSelect
          name="year_level"
          label={intl.formatMessage({
            id: 'pages.searchTable.form.yearLevel',
            defaultMessage: 'Year level',
          })}
          width="md"
          valueEnum={{
            '1ST YEAR': {
              text: intl.formatMessage({
                id: 'pages.searchTable.yearLevel.1stYear',
                defaultMessage: '1ST YEAR',
              }),
            },
            '2ND YEAR': {
              text: intl.formatMessage({
                id: 'pages.searchTable.yearLevel.2ndYear',
                defaultMessage: '2ND YEAR',
              }),
            },
            '3RD YEAR': {
              text: intl.formatMessage({
                id: 'pages.searchTable.yearLevel.3rdYear',
                defaultMessage: '3RD YEAR',
              }),
            },
            '4TH YEAR': {
              text: intl.formatMessage({
                id: 'pages.searchTable.yearLevel.4thYear',
                defaultMessage: '4TH YEAR',
              }),
            },
          }}
          rules={[{ required: true }]}
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="section"
          label={intl.formatMessage({
            id: 'pages.searchTable.form.section',
            defaultMessage: 'Section',
          })}
        />
      </ModalForm>

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.student_lrn && (
          <ProDescriptions
            column={2}
            title={currentRow?.student_lrn}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
