import React from 'react';
import { useState, useEffect } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import menuItemSchema from '../../schemas/menuItemsSchema';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import logger from 'sabio-debug';
import menuItemsService from '../../services/menuItemsService';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import AllMenuItemsMultiSelect from './AllMenuItemsMultiSelect';
import OrderStatusDropdown from './OrderStatusDropdown';
import FileUploaderContainer from '../../components/FileUploaderContainer';
import FoodSafeTypesMultiSelect from './FoodSafeTypesMultiSelect';
import TagsMultiSelect from './TagsMultiSelect';
import IngredientsMultiSelect from './IngredientsMultiSelect';
import RenderImage from './RenderImage';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'toastr/build/toastr.min.css';
import './menuitems.css';

const _logger = logger.extend('MenuItemBuilder');

function MenuItemBuilder() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        id: '',
        organizationId: '1',
        orderStatusId: '',
        unitCost: '',
        name: '',
        description: '',
        imageUrl: '',
        menuFoodSafeType: '',
        tags: '',
        menuIngredients: '',
    });

    useEffect(() => {
        if (location.state?.type === 'UPDATE_MENUITEM') {
            setFormData({
                ...location.state.payload,
            });
        }
    }, [location]);

    const handleSubmit = (values, { resetForm }) => {
        _logger('handleSubmit', values);
        debugger;
        let payload = {
            id: values?.id,
            organizationId: values.organization.id,
            orderStatusId: values.orderStatus.id,
            unitCost: values.unitCost,
            name: values.name,
            description: values.description,
            imageUrl: values.imageUrl,
            menuFoodSafeType: values.menuFoodSafeTypes,
            tags: values.tags,
            menuIngredients: values.menuIngredients,
        };
        if (values.id) {
            menuItemsService.UpdateAllItems(payload).then(onPutMenuItemSuccess).catch(onPutError);
            resetForm({});
        } else {
            menuItemsService.AddAllItems(payload).then(onPostMenuItemSuccess).catch(onPostError);
            resetForm({});
        }
    };
    const onPostMenuItemSuccess = (data) => {
        Swal.fire('Good job!', `You have successfully created a Menu Item ${data.item}`, 'success');
        navigate(`/menuitem`);
    };
    const onPostError = () => {
        toastr.error('Wrong information. Please Try again.');
    };
    const onPutMenuItemSuccess = () => {
        Swal.fire('Good job!', `You have successfully updated a Menu Item`, 'success');
        navigate(`/menuitem`);
    };
    const onPutError = () => {
        _logger('onPutError');
        toastr.error('Wrong information. Please Try again.');
    };
    const onFileUpload = (files, setFieldValue) => {
        setFieldValue('imageUrl', files[0].url);
    };

    const onBackClicked = () => {
        navigate(`/menuitem`);
    };

    return (
        <React.Fragment>
            <Container>
                <Formik
                    enableReinitialize={true}
                    initialValues={formData}
                    onSubmit={handleSubmit}
                    validationSchema={menuItemSchema}>
                    {({ setFieldValue }) => (
                        <Card>
                            <Row>
                                <Col>
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <h2 className="header-title">Add or Update a Menu Item!</h2>
                                            </Col>
                                            <Col>
                                                <button
                                                    className=" btn btn-primary menu-item-card-button"
                                                    onClick={onBackClicked}>
                                                    Your Menu Items
                                                </button>
                                            </Col>
                                        </Row>
                                        <p></p>
                                        <Form>
                                            <Col>
                                                <div className="Col-6">
                                                    <p></p>
                                                    <Row>
                                                        <AllMenuItemsMultiSelect />
                                                    </Row>
                                                    <p></p>
                                                    <Row>
                                                        <OrderStatusDropdown />
                                                    </Row>
                                                    <p></p>
                                                    <Row>
                                                        <label className="menu-item-form-label">Unit Cost</label>
                                                        <Field
                                                            type="text"
                                                            name="unitCost"
                                                            id="unitCost"
                                                            placeholder="$"
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
                                                        <label>Name</label>
                                                        <Field
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            placeholder="..."
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
                                                        <label>Description</label>
                                                        <Field
                                                            component="textarea"
                                                            label="Text Area"
                                                            type="textarea"
                                                            name="description"
                                                            rows="6"
                                                            placeholder="A tasty menu item."
                                                            className="form-control"
                                                            key="textarea"
                                                        />
                                                    </div>
                                                    <p></p>
                                                    <Row>
                                                        <RenderImage />
                                                        <label>Upload Image File</label>
                                                        <div name="imageUrl">
                                                            <FileUploaderContainer
                                                                onHandleUploadSuccess={(files) =>
                                                                    onFileUpload(files, setFieldValue)
                                                                }
                                                            />
                                                        </div>
                                                    </Row>
                                                    <p></p>
                                                    <Row>
                                                        <FoodSafeTypesMultiSelect />
                                                    </Row>
                                                    <p></p>
                                                    <Row>
                                                        <TagsMultiSelect />
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
                                            </Col>
                                        </Form>
                                    </Card.Body>
                                </Col>
                                <Col>
                                    <Card.Body>
                                        <div className="Col-6">
                                            <Row className="menu-item-row">
                                                <IngredientsMultiSelect />
                                            </Row>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    )}
                </Formik>
            </Container>
        </React.Fragment>
    );
}

export default React.memo(MenuItemBuilder);
