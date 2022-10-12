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
import PropTypes from 'prop-types';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'toastr/build/toastr.min.css';
import './menuitems.css';

const _logger = logger.extend('MenuItemBuilder');

function MenuItemBuilder(props) {
    const currentUserOrg = props.currentUserOrg.id;
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        id: '',
        organization: currentUserOrg,
        orderStatus: 1,
        unitCost: '',
        name: '',
        description: '',
        imageUrl: '',
        menuFoodSafeType: [],
        tags: [],
        menuIngredients: [],
    });

    useEffect(() => {
        if (location.state?.type === 'UPDATE_MENUITEM') {
            setFormData({
                ...location.state.payload,
            });
        }
    }, [location]);

    const onPostMenuItemSuccess = (data) => {
        Swal.fire({
            icon: 'success',
            title: `You have successfully created Menu Item ${data.item}`,
            timer: 3000,
            timerProgressBar: true,
        });
        navigate(`/menuitem`);
    };
    const onPostError = () => {
        toastr.error('Wrong information. Please Try again.');
    };
    const onPutMenuItemSuccess = () => {
        Swal.fire({
            icon: 'success',
            title: `You have successfully updated a Menu Item`,
            timer: 3000,
            timerProgressBar: true,
        });
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
    const handleSubmit = (values) => {
        _logger('handleSubmit', values);
        let getFoodSafeTypes = (values) => {
            if (values.menuFoodSafeType) {
                let item = values.menuFoodSafeType?.map(mapItems);
                return item;
            }
        };
        let getTags = (values) => {
            if (values.tags) {
                let item = values.tags?.map(mapItems);
                return item;
            }
        };
        let getMenuIngredients = (values) => {
            if (values.menuIngredients) {
                let item = values.menuIngredients?.map(mapItems);
                return item;
            }
        };
        let payloadToAdd = {
            organizationId: formData.organization,
            orderStatusId: parseInt(values.orderStatus),
            unitCost: parseFloat(values.unitCost),
            name: values.name,
            description: values?.description,
            imageUrl: values?.imageUrl,
            menuFoodSafeTypes: getFoodSafeTypes(values),
            tagIds: getTags(values),
            menuIngredients: getMenuIngredients(values),
        };

        let payloadToUpdate = payloadToAdd;
        payloadToAdd.id = values.id;

        if (values.id === '' || !values.id) {
            menuItemsService.AddAllItems(payloadToAdd).then(onPostMenuItemSuccess).catch(onPostError);
        } else {
            menuItemsService.UpdateAllItems(payloadToUpdate).then(onPutMenuItemSuccess).catch(onPutError);
        }
    };
    const mapItems = (mappedTypes) => {
        return mappedTypes.id;
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
                                                        <AllMenuItemsMultiSelect
                                                            organizationId={formData.organization}
                                                        />
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
                                                        <FoodSafeTypesMultiSelect
                                                            organizationId={formData.organization}
                                                        />
                                                    </Row>
                                                    <p></p>
                                                    <Row>
                                                        <TagsMultiSelect organizationId={formData.organization} />
                                                    </Row>
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
                                                <IngredientsMultiSelect organizationId={formData.organization} />
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
MenuItemBuilder.propTypes = {
    currentUserOrg: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }),
};
export default React.memo(MenuItemBuilder);
