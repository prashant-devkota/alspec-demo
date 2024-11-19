import { useMemo, Fragment, useState, useEffect } from 'react'
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { HiOutlineChevronRight, HiOutlineChevronDown, HiPlusCircle } from 'react-icons/hi'
import type { ColumnDef, Row } from '@tanstack/react-table'
import type { ReactElement } from 'react'
import *  as jobService from '@/services/JobService';
import { Loading } from '@/components/shared'
import { Alert, Button, Drawer, FormContainer, FormItem, Input, Tag } from '@/components/ui'
import type { MouseEvent } from 'react'
import { Field, Form, Formik } from 'formik'
import ToastService from '@/services/ToastService'

type ReactTableProps<T> = {
    renderRowSubComponent: (props: { row: Row<T> }) => ReactElement
    getRowCanExpand: (row: Row<T>) => boolean
}

const { Tr, Th, Td, THead, TBody } = Table

type Jobs = {
    Id: string
    title: string
    description: string
    subItems?: SubItems[]
}

type SubItems = {
    title: string
    description: string
    status: string
}

function RenderJobsTable({ renderRowSubComponent, getRowCanExpand }: ReactTableProps<Jobs>) {
    const [jobsList, setJobsList] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true);
    }

    const onDrawerClose = (e: MouseEvent) => {
        console.log('onDrawerClose', e)
        setIsOpen(false)
    }

    const addNewJob = (values: any) => {
        setLoading(true);
        jobService.createJob(values).then(() => {
            setIsOpen(false);
            fetchData().then(() => {
                ToastService.showToast('Success', 'Transaction completed successfully', 'success');
                setLoading(false);
            });
        },(error:any)=>{
            ToastService.showToast('Failed', 'Transaction completed successfully', 'danger');
        });
    }

    const columns = useMemo<ColumnDef<Jobs>[]>(
        () => [
            {
                // Make an expander cell
                header: () => null, // No header
                id: 'expander', // It needs an ID
                cell: ({ row }) => (
                    <>
                        {row.getCanExpand() ? (
                            <button
                                className="text-lg"
                                {...{ onClick: row.getToggleExpandedHandler() }}
                            >
                                {row.getIsExpanded() ? (
                                    <HiOutlineChevronDown />
                                ) : (
                                    <HiOutlineChevronRight />
                                )}
                            </button>
                        ) : null}
                    </>
                ),
                // We can override the cell renderer with a SubCell to be used with an expanded row
                subCell: () => null, // No expander on an expanded row
            },
            {
                header: 'Title',
                accessorKey: 'title',
            },
            {
                header: 'Description',
                accessorKey: 'description',
            }
        ],
        []
    )

    const table = useReactTable({
        data: jobsList,
        columns,
        getRowCanExpand,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    })

    useEffect(() => {
        fetchData();
    }, [1, 1])

    const fetchData = async () => {
        try {
            const response = await jobService.getAllJobs();
            setJobsList(response);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <Loading loading={loading}>
                <div className='flex items-end'>
                    <Button variant="solid" size="sm" icon={<HiPlusCircle />} onClick={openDrawer}>
                        Add new job
                    </Button>
                </div>
                <Table>
                    <THead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </Th>
                                    )
                                })}
                            </Tr>
                        ))}
                    </THead>
                    <TBody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Fragment key={row.id}>
                                    <Tr>
                                        {/* first row is a normal row */}
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            )
                                        })}
                                    </Tr>
                                    {row.getIsExpanded() && (
                                        <Tr>
                                            {/* 2nd row is a custom 1 cell row */}
                                            <Td
                                                colSpan={
                                                    row.getVisibleCells().length
                                                }
                                            >
                                                {renderRowSubComponent({ row })}
                                            </Td>
                                        </Tr>
                                    )}
                                </Fragment>
                            )
                        })}
                    </TBody>
                </Table>
            </Loading>

            <Drawer
                title="Add new job"
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <div>
                    <Formik
                        initialValues={{
                            title: '',
                            description: ''
                        }}
                        onSubmit={(values, { resetForm, setSubmitting }) => {
                            addNewJob(values);
                            setSubmitting(false);
                            resetForm();
                        }}
                    >
                        {({ touched, errors, resetForm }) => (
                            <Form>
                                <FormContainer>
                                    <FormItem
                                        label="Title"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="title"
                                            placeholder="Job title"
                                            component={Input}
                                            maxLength={50}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Description"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="description"
                                            placeholder="Type text here"
                                            component={Input}
                                            maxLength={200}
                                        />
                                    </FormItem>
                                    <FormItem>
                                        <div className='flex flex-col items-end'>
                                            <Button block variant="solid" type="submit" size="sm" icon={<HiPlusCircle />}>
                                                Submit
                                            </Button>
                                        </div>

                                    </FormItem>
                                </FormContainer>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Drawer>
        </div>
    )
}

const RenderSubItems = ({ row }: { row: Row<Jobs> }) => {
    return (
        <>
            <Table>
                <THead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Description</Th>
                        <Th>Status</Th>
                    </Tr>
                </THead>
                <TBody>
                    {(row.original.subItems || []).map((item: any) => (
                        <Tr key={item.itemId}>
                            <Td>{item.title}</Td>
                            <Td>{item.description}</Td>
                            <Td>
                                {item.status == "In Progress" &&
                                    <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded">
                                        {item.status}
                                    </Tag>
                                }
                                {item.status == "Completed" &&
                                    <Tag className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border-0 rounded">
                                        {item.status}
                                    </Tag>
                                }
                                {item.status == "Draft" &&
                                    <Tag className="bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-100 border-0 rounded">
                                        {item.status}
                                    </Tag>
                                }

                            </Td>
                        </Tr>
                    ))
                    }
                </TBody>
            </Table>

            {row.original.subItems?.length == 0 &&
                <div>
                    <Alert>
                        No data to display.
                    </Alert>
                </div>
            }
        </>
    )
}

const JobsList = () => {
    return (
        <RenderJobsTable
            renderRowSubComponent={RenderSubItems}
            getRowCanExpand={() => true}
        />
    )
}

export default JobsList
