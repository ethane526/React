import React from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Table from '../../common-components/Table';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';

function NameColumn({ row }) {
    return (
        <div className="table-user">
            <Link to="#" className="text-body fw-semibold">
                {row.original.user}
            </Link>
        </div>
    );
}

function SurveyColumn({ row }) {
    return (
        <div className="table-survey">
            <Link to="#" className="text-body fw-semibold">
                {row.original.survey}
            </Link>
        </div>
    );
}

function ActionColumn() {
    return (
        <React.Fragment>
            <>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Inspect</Tooltip>}>
                    <Link to="#" className="action-icon">
                        {''}
                        <i className="mdi mdi-eye"></i>
                    </Link>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete</Tooltip>}>
                    <Link to="#" className="action-icon">
                        {''}
                        <i className="mdi mdi-delete"></i>
                    </Link>
                </OverlayTrigger>
            </>
        </React.Fragment>
    );
}

const columns = [
    {
        Header: 'Survey',
        accessor: 'survey',
        sort: true,
        classes: 'table-survey',
        Cell: SurveyColumn,
    },
    {
        Header: 'User Email',
        accessor: 'user',
        sort: true,
        Cell: NameColumn,
        classes: 'table-user',
    },
    {
        Header: 'Action',
        accessor: 'action',
        sort: false,
        classes: 'table-action',
        Cell: ActionColumn,
    },
];

const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    },
    {
        text: '50',
        value: 50,
    },
];

function SurveysInstancesTable(props) {
    const _logger = debug.extend('SureveyInstancesTable');
    _logger('Props.Instances: ', props.instances);
    return (
        <>
            <Table
                columns={columns}
                data={props.instances}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSelectable={false}
                isSearchable={true}
                tableClass="table-striped"
                searchBoxClass="mt-2 mb-3"></Table>
        </>
    );
}

NameColumn.propTypes = {
    row: PropTypes.shape({
        original: PropTypes.shape({ user: PropTypes.string }),
    }),
};

SurveyColumn.propTypes = {
    row: PropTypes.shape({
        original: PropTypes.shape({ survey: PropTypes.string }),
    }),
};

ActionColumn.propTypes = {
    row: PropTypes.shape({
        original: PropTypes.shape({ id: PropTypes.number }),
    }),
};

SurveysInstancesTable.propTypes = {
    instances: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SurveysInstancesTable;
