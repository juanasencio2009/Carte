import React from 'react';
import { useState, useEffect } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import menuItemSchema from '../../schemas/menuItemsSchema';
import { Container, Card, Row } from 'react-bootstrap';
import logger from 'sabio-debug';
import * as lookUpService from '../../services/lookUpService';
import menuItemsService from '../../services/menuItemsService';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import FileUploaderContainer from '../../components/FileUploaderContainer';
import { useLocation } from 'react-router-dom';

import './menuitems.css';
import 'toastr/build/toastr.min.css';

const _logger = logger.extend('MenuItemAddForm');

function MenuItemAddForm() {
    const location = useLocation();
    _logger('location-->', location, location.state?.id);

    const [formData, setFormData] = useState({
        organizationId: 1,
        orderStatusId: 1,
        unitCost: '',
        name: '',
        description: '',
        imageUrl: '',
    });
    const [orderStatus, setOrderStatus] = useState([]);
    const tableName = 'StatusTypes';

    useEffect(() => {
        if (location.state?.type === 'UPDATE_MENUITEM') {
            setFormData({
                ...location.state.payload,
            });
        }
        getLookUp();
    }, [location]);
    const getLookUp = () => {
        lookUpService.getLookUp(tableName).then(getItemSuccess).catch(getItemError);
    };
    const getItemSuccess = (data) => {
        let arrayOfStatus = data.items;
        setOrderStatus(arrayOfStatus.map(mapStatusDropDown));
    };
    const getItemError = (err) => {
        _logger('getItemError', err);
        toastr.error('Oops, something failed in the background');
    };
    const mapStatusDropDown = (status) => {
        return (
            <option key={status.id} value={status.id}>
                {status.name}
            </option>
        );
    };
    const handleSubmit = (values, { resetForm }) => {
        let id = values.id;
        _logger('handleSubmit IS firing', values, '<---Values');
        if (location.state?.payload.id) {
            let payload = {
                id: values.id,
                organizationId: values.orderStatus.id,
                orderStatusId: values.organization.id,
                unitCost: values.unitCost,
                name: values.name,
                description: values.description,
                imageUrl: values.imageUrl,
            };
            menuItemsService.update(payload, id).then(onPutMenuItemSuccess).catch(onPutError);
            resetForm({});
        } else if (values) {
            values.orderStatusId = parseInt(values.orderStatusId);
            menuItemsService.add(values).then(onPostMenuItemSuccess).catch(onPostError);
            resetForm({});
        }
    };
    const onPostMenuItemSuccess = (data) => {
        _logger('onPostMenuItemSuccess ok', data);
        Swal.fire('Good job!', `You have successfully created a Menu Item ${data.item}`, 'success');
    };
    const onPostError = () => {
        _logger('onERROR');
        toastr.error('Wrong information. Please Try again.');
    };
    const onPutMenuItemSuccess = (data) => {
        _logger('onPutMenuItemSuccess ok', data);
        Swal.fire('Good job!', `You have successfully updated a Menu Item`, 'success');
    };
    const onPutError = () => {
        _logger('onPutError');
        toastr.error('Wrong information. Please Try again.');
    };
    const onFileUpload = (files, setFieldValue) => {
        setFieldValue('imageUrl', files[0].url);
    };

    return (
        <React.Fragment>
            <Container>
                <Card>
                    <Formik
                        enableReinitialize={true}
                        initialValues={formData}
                        onSubmit={handleSubmit}
                        validationSchema={menuItemSchema}>
                        {({ setFieldValue }) => (
                            <Card.Body>
                                <h2 className="header-title">Create or Update a Menu Item!</h2>
                                <p></p>
                                <Form>
                                    <Row>
                                        <div className="Col-6">
                                            <p></p>
                                            <Row>
                                                <label htmlFor="grid">Select Order Status</label>
                                                <Field
                                                    name="orderStatusId"
                                                    label="Select Order Status Id"
                                                    as="select"
                                                    id="orderStatus"
                                                    containerlass="mb-3"
                                                    className="form-select menu-item-form-input"
                                                    key="select">
                                                    {orderStatus}
                                                </Field>
                                            </Row>
                                            <p></p>
                                            <Row>
                                                <label className="menu-item-form-label" htmlFor="grid">
                                                    Unit Cost
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="unitCost"
                                                    id="unitCost"
                                                    className="form-control menu-item-form-input"
                                                />
                                                <ErrorMessage
                                                    name="unitCost"
                                                    component="div"
                                                    className="has-error menu-item-error-message"
                                                />
                                            </Row>
                                            <p></p>
                                            <Row>
                                                <label htmlFor="grid">Name</label>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="form-control menu-item-form-input"
                                                />
                                                <ErrorMessage
                                                    name="name"
                                                    component="div"
                                                    className="has-error menu-item-error-message"
                                                />
                                            </Row>
                                            <p></p>
                                            <div className="form-group">
                                                <label htmlFor="content">Description</label>
                                                <Field
                                                    component="textarea"
                                                    label="Text Area"
                                                    type="textarea"
                                                    name="description"
                                                    rows="5"
                                                    containerclass={'lg-3'}
                                                    className="form-control"
                                                    key="textarea"
                                                />
                                            </div>
                                            <p></p>
                                            <Row>
                                                <label htmlFor="content">Upload Image File</label>
                                                <div name="imageUrl">
                                                    <FileUploaderContainer
                                                        onHandleUploadSuccess={(files) =>
                                                            onFileUpload(files, setFieldValue)
                                                        }
                                                    />
                                                </div>
                                            </Row>
                                            <p></p>
                                            <Row sm={6}>
                                                <button
                                                    type="onSubmit"
                                                    className="btn btn-primary menu-item-form-button">
                                                    Submit
                                                </button>
                                            </Row>
                                        </div>
                                    </Row>
                                </Form>
                            </Card.Body>
                        )}
                    </Formik>
                </Card>
            </Container>
        </React.Fragment>
    );
}

MenuItemAddForm.propTypes = {
    organizationId: PropTypes.number.isRequired,
    orderStatusId: PropTypes.number.isRequired,
    unitCost: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    url: PropTypes.string,
};

export default MenuItemAddForm;
