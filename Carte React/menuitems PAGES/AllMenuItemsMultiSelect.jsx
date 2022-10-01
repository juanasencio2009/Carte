import React from 'react';
import { useState, useEffect } from 'react';
import { Field, useFormikContext } from 'formik';
import { useLocation } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import logger from 'sabio-debug';
import menuItemsService from '../../services/menuItemsService';

const _logger = logger.extend('AllMenuItemsMultiSelect');

function AllMenuItemsMultiSelect() {
    const location = useLocation();

    const [menuItems, setMenuItems] = useState({
        allMenuItems: [],
    });
    const { setFieldValue } = useFormikContext();
    const orgId = 1; //NOTE: this will be the user.orgId in a new proc PR

    useEffect(() => {
        getAllByOrgId();
    }, []);
    const getAllByOrgId = () => {
        menuItemsService.getAllByOrgId(orgId).then(getMenuItemsSuccess).catch(getMenuItemsError);
    };

    const getMenuItemsSuccess = (response) => {
        let arrayOfItems = response?.item;
        setMenuItems({ allMenuItems: arrayOfItems });
    };
    const getMenuItemsError = (response) => {
        _logger('response-->', response);
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
        setFieldValue('organizationId', menuItems.allMenuItems[index].organization.id);
        setFieldValue('orderStatusId', menuItems.allMenuItems[index].orderStatus.id);
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
            <label>Select a Menu Item to edit.</label>
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
export default React.memo(AllMenuItemsMultiSelect);
