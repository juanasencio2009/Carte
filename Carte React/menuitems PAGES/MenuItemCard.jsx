import React from 'react';
import logger from 'sabio-debug';
import menuItemsService from '../../services/menuItemsService';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { useNavigate } from 'react-router-dom';
import { Col, Card, Row } from 'react-bootstrap';
import PencilSvg from './PencilSvg';
import TrashSvg from './TrashSvg';

import 'toastr/build/toastr.min.css';
import 'rc-pagination/assets/index.css';
import './menuitems.css';

const _logger = logger.extend('MenuItemCard');

function MenuItemCard(props) {
    const { menuItem } = props;
    const navigate = useNavigate();

    const showFoodSafeTypes = () => {
        if (menuItem.tags !== null) {
            let tagAr = menuItem.tags;
            for (let index = 0; index < tagAr.length; index++) {
                const tags = tagAr[index].name;
                return tags;
            }
        } else {
            return 'No tags available';
        }
    };
    const showIngredients = () => {
        if (menuItem.menuIngredients !== null) {
            _logger('showIngredients', menuItem);
            let menuIngredient = menuItem?.menuIngredients;
            for (let index = 0; index < menuIngredient.length; index++) {
                const ingredient = menuIngredient[index].name;
                return ingredient;
            }
        } else {
            return 'No ingredients available';
        }
    };
    const onEditClicked = (e) => {
        let payload = e;
        const aMenuItem = e.id;
        navigateToForm(aMenuItem, payload);
    };
    const onDeleteClicked = (e) => {
        e.preventDefault();
        const aMenuItem = e.currentTarget.dataset.page;
        menuItemsService.deleteById(aMenuItem).then(deleteItemSuccess).catch(deleteItemError);
    };
    const deleteItemSuccess = (data) => {
        _logger('deleteItemSuccess--->', data);
        toastr.success('You have successfully Deleted a Menu Item');
        window.location.reload();
    };
    const deleteItemError = (data) => {
        _logger('deleteItemError--->', data);
        toastr.error('Oops, something went wrong when deleting your Menu Item.');
    };
    const navigateToForm = (aMenuItem, payload) => {
        let state = { type: 'UPDATE_MENUITEM', payload: payload };
        navigate(`/menuitem/builder/${aMenuItem}`, { state });
    };

    return (
        <Col className="col-12 col-md-4">
            <Card className="d-block" label={menuItem.name} value={menuItem.id}>
                <div className="menu-items-image-container">
                    <Card.Img src={menuItem.imageUrl} className="menu-item-image" alt="Card image cap" />
                </div>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title as="h5">{menuItem.name}</Card.Title>
                        </Col>
                        <Col>
                            <Card.Text className="number">${menuItem.unitCost}</Card.Text>
                        </Col>
                    </Row>

                    <Card.Text>{menuItem.description}</Card.Text>
                    <Card.Text>Tags: {showFoodSafeTypes()}</Card.Text>
                    <Card.Text>Ingredients: {showIngredients()}</Card.Text>
                    <Row>
                        <Col>
                            <button
                                type="button"
                                className="btn menu-item-card-button"
                                onClick={() => onEditClicked(menuItem)}
                                data-page={menuItem.id}
                                data-menu={menuItem}>
                                <PencilSvg />
                            </button>
                        </Col>
                        <Col>
                            <button
                                type="button"
                                className="btn menu-item-card-button"
                                onClick={onDeleteClicked}
                                data-page={menuItem.id}>
                                <TrashSvg />
                            </button>
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
            name: PropTypes.string.isRequired,
            logo: PropTypes.string,
            siteUrl: PropTypes.string,
        }),

        orderStatus: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
    }),
};

export default React.memo(MenuItemCard);
