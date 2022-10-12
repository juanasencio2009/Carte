import React from 'react';
import { useState, useEffect } from 'react';
import { Field, useFormikContext } from 'formik';
import { useLocation } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import logger from 'sabio-debug';
import menuItemsService from '../../services/menuItemsService';
import PropTypes from 'prop-types';

const _logger = logger.extend('AllMenuItemsMultiSelect');

function AllMenuItemsMultiSelect(props) {
    const location = useLocation();
    const organizationId = props.organizationId;
    const [menuItems, setMenuItems] = useState({
        allMenuItems: [],
    });
    const { setFieldValue } = useFormikContext();

    useEffect(() => {
        if (organizationId > 0) {
            getAllByOrgId();
        }
    }, [organizationId]);
    const getAllByOrgId = () => {
        _logger('organizationId', organizationId);
        menuItemsService.getAllByOrgId(organizationId).then(getMenuItemsSuccess).catch(getMenuItemsError);
    };

    const getMenuItemsSuccess = (response) => {
        let arrayOfItems = response?.item;
        setMenuItems({ allMenuItems: arrayOfItems });
    };
    const getMenuItemsError = () => {
        toastr.error('Oops, something failed fetching all Menu Items');
    };

    const mapMenuDropDown = (mappedMenuItem, index) => {
        if (!location.state?.payload.id) {
            return (
                <option value={index} key={`menu_item_multi_select_${mappedMenuItem.id}`}>
                    {mappedMenuItem.name}
                </option>
            );
        }
    };

    const onSelectedChange = (e) => {
        const index = e.target.value;
        setFieldValue('id', menuItems.allMenuItems[index].id);
        setFieldValue('organization', organizationId);
        setFieldValue('orderStatus', menuItems.allMenuItems[index].orderStatus.id);
        setFieldValue('unitCost', menuItems.allMenuItems[index].unitCost);
        setFieldValue('name', menuItems.allMenuItems[index].name);
        setFieldValue('description', menuItems.allMenuItems[index].description);
        setFieldValue('imageUrl', menuItems.allMenuItems[index].imageUrl);
        setFieldValue('menuFoodSafeType', menuItems.allMenuItems[index].menuFoodSafeType);
        setFieldValue('tags', menuItems.allMenuItems[index].tags);
        setFieldValue('menuIngredients', menuItems.allMenuItems[index].menuIngredients);
    };

    return (
        <React.Fragment>
            <label>Select if you wish to edit a Menu Item. Do not select if you wish to create a Menu Item.</label>
            <Field
                name="index"
                label="selectMenuItem"
                as="select"
                id="id"
                className="form-select menu-item-form-input"
                onChange={(e) => {
                    onSelectedChange(e);
                }}>
                <option>...</option>
                {menuItems.allMenuItems.map(mapMenuDropDown)}
            </Field>
        </React.Fragment>
    );
}
AllMenuItemsMultiSelect.propTypes = {
    organizationId: PropTypes.number, //NOTE: not required
};
export default AllMenuItemsMultiSelect;
