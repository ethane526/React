import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import PageTitle from '../../common-components/PageTitle';
import SurveysInstancesTable from './SurveysInstancesTable';
import * as surveysInstancesService from '../../../services/survey-services/surveysInstancesService';
import debug from 'sabio-debug';

function SurveysInstances() {
    const _logger = debug.extend('SurveysInstances');
    const [surveysInstancesData, setSurveysInstancesData] = useState({
        arrayOfInstances: [],
    });

    useEffect(() => {
        surveysInstancesService.getAll().then(onGetAllInstancesSuccess).catch(onGetAllInstancesError);
    }, []);

    const onGetAllInstancesSuccess = (response) => {
        _logger('onGetAllInstancesSuccess', response);
        let newInstanceArray = response.data.items;
        _logger('Items', newInstanceArray);
        setSurveysInstancesData((prevState) => {
            const sid = { ...prevState };
            sid.arrayOfInstances = newInstanceArray;
            return sid;
        });
    };

    const onGetAllInstancesError = (err) => {
        _logger('onGetAllInstancesError', err);
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Surveys', path: '/surveys' },
                    {
                        label: 'SurveysInstances',
                        path: '/surveysinstanaces',
                        active: true,
                    },
                ]}
                title={'Survey Instances'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <div className="text-sm-left">
                                        <Button className="btn btn-danger mb-2">Delete Selected</Button>
                                    </div>
                                </Col>
                            </Row>
                            <SurveysInstancesTable instances={surveysInstancesData.arrayOfInstances} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default SurveysInstances;
