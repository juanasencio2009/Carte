import React from 'react';
import logger from 'sabio-debug';
import menuItemsService from '../../services/menuItemsService';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { useNavigate } from 'react-router-dom';
import { Col, Card, Row, Button } from 'react-bootstrap';
import { TiPencil } from 'react-icons/ti';
import { MdDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';

import 'toastr/build/toastr.min.css';
import 'rc-pagination/assets/index.css';
import './menuitems.css';

const _logger = logger.extend('MenuItemCard');

function MenuItemCard(props) {
    const { menuItem } = props;
    const navigate = useNavigate();

    const showFoodSafeTypes = () => {
        if (menuItem.menuFoodSafeType !== null) {
            let array = menuItem.menuFoodSafeType;
            let result = array.map(mapNames);
            return result;
        } else {
            return 'None available';
        }
    };
    const showTags = () => {
        if (menuItem.tags !== null) {
            let tagAr = menuItem.tags;
            let result = tagAr.map(mapNames);
            return result;
        } else {
            return 'None available';
        }
    };
    const showIngredients = () => {
        if (menuItem.menuIngredients !== null) {
            _logger('showIngredients', menuItem);
            let menuIngredient = menuItem?.menuIngredients;
            let result = menuIngredient.map(mapNames);
            return result;
        } else {
            return 'None available';
        }
    };
    const mapNames = (mappedTypes) => {
        return ` ${mappedTypes.name}`;
    };
    const onEditClicked = (e) => {
        let payload = e;
        const menuItemId = e.id;
        navigateToForm(menuItemId, payload);
    };
    const onDeleteClicked = (e) => {
        e.preventDefault();
        const aMenuItem = e.currentTarget.dataset.page;
        Swal.fire({
            title: 'Are you sure you want to delete this item?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then((result) => {
            _logger('resultDeleteSwal', result);
            if (result.isConfirmed) {
                menuItemsService.deleteById(aMenuItem).then(deleteItemSuccess).catch(deleteItemError);
            }
        });
    };

    const deleteItemSuccess = (data) => {
        _logger('deleteItemSuccess--->', data);
        window.location.reload();
    };
    const deleteItemError = () => {
        toastr.error('Oops, something went wrong when deleting your Menu Item.');
    };
    const navigateToForm = (aMenuItem, payload) => {
        let state = { type: 'UPDATE_MENUITEM', payload: payload };
        navigate(`/menuitem/builder/${aMenuItem}`, { state });
    };

    return (
        <Col className="col-12 col-md-4 menu-item-card">
            <Card className="d-block" label={menuItem.name} value={menuItem.id}>
                <div className="menu-items-image-container">
                    <Card.Img src={menuItem.imageUrl} className="menu-item-image" alt="No image available" />
                </div>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title as="h5">{menuItem.name}</Card.Title>
                        </Col>
                        <Col>
                            <Card.Title className="number">${menuItem.unitCost}</Card.Title>
                        </Col>
                    </Row>

                    <Card.Text>{menuItem.description}</Card.Text>
                    <Card.Text>Ingredients: {showIngredients()}</Card.Text>
                    <Card.Text>Food Safe Types: {showFoodSafeTypes()}</Card.Text>
                    <Card.Text>Tags: {showTags()}</Card.Text>

                    <Row>
                        <Col>
                            <Button
                                variant="primary"
                                className="btn rounded-pill menu-item-card-button"
                                onClick={() => onEditClicked(menuItem)}
                                data-page={menuItem.id}
                                data-menu={menuItem}>
                                <TiPencil />
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="danger"
                                className="btn rounded-pill menu-item-card-button"
                                onClick={onDeleteClicked}
                                data-page={menuItem.id}>
                                <MdDeleteForever />
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}
MenuItemCard.propTypes = {
    menuItem: PropTypes.shape({
        id: PropTypes.number.isRequired,
        unitCost: PropTypes.string.isRequired, //NOTE: leave this as string
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        imageUrl: PropTypes.string,
        dateCreated: PropTypes.string,
        dateModified: PropTypes.string,
        isDeleted: PropTypes.bool,
        isPublic: PropTypes.bool,
        createdBy: PropTypes.number,
        modifiedBy: PropTypes.number,

        menuIngredients: PropTypes.arrayOf(
            //NOTE: none are required
            PropTypes.shape({
                id: PropTypes.number,
                organizationId: PropTypes.number,
                name: PropTypes.string,
                logo: PropTypes.string,
                imageUrl: PropTypes.string,
                createdBy: PropTypes.number,
                modifiedBy: PropTypes.number,
                dateCreated: PropTypes.string,
                dateModified: PropTypes.string,
                isDeleted: PropTypes.bool,
                isInStock: PropTypes.bool,
                measure: PropTypes.number,
                restriction: PropTypes.string,
                unitCost: PropTypes.number,
            })
        ),
        menuFoodSafeType: PropTypes.arrayOf(
            //NOTE: none are required
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
            })
        ),
        tags: PropTypes.arrayOf(
            //NOTE: none are required
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
            })
        ),
        organization: PropTypes.shape({
            id: PropTypes.number.isRequired,
        }),

        orderStatus: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
    }),
};

export default React.memo(MenuItemCard);
