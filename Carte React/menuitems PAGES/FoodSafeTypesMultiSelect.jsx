import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as lookUpService from '../../services/lookUpService';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import logger from 'sabio-debug';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useFormikContext, ErrorMessage } from 'formik';

const _logger = logger.extend('FoodSafeTypesMultiSelect');

function FoodSafeTypesMultiSelect() {
    const [foodSafeTypes, setFoodSafeTypes] = useState({ allFoodSafeTypes: [] });
    const location = useLocation();
    const tableName = ['FoodSafeTypes'];
    const { setFieldValue, values } = useFormikContext();

    useEffect(() => {
        serviceCall();
    }, []);
    const serviceCall = () => {
        lookUpService.getTypes(tableName).then(getFoodSafeTypeSuccess).catch(getFoodSafeTypeError);
    };
    const getFoodSafeTypeSuccess = (response) => {
        _logger('response', response);
        let arrayOfFoods = response.item.foodSafeTypes;
        setFoodSafeTypes((prevState) => {
            const pd = { ...prevState };
            pd.allFoodSafeTypes = arrayOfFoods?.map(displayMultiSelect);
            return pd;
        });
    };
    const displayMultiSelect = (mappedItems) => {
        return {
            id: mappedItems.id,
            label: mappedItems.name,
        };
    };
    const getFoodSafeTypeError = () => {
        toastr.error('Oops, something failed fetching Food Safe Types');
    };
    const foodSafeTypePlaceholder = () => {
        if (location.state?.payload.menuFoodSafeType && location.state?.payload.menuFoodSafeType !== null) {
            let menuFst = location.state?.payload.menuFoodSafeType;
            let result = menuFst.map(mapPlaceholder);
            return result;
        } else if (values?.menuFoodSafeType) {
            _logger('values', values);
            let value = values.menuFoodSafeType;
            let valuesName = value.map(mapPlaceholder);
            return valuesName;
        } else {
            return 'Must select';
        }
    };
    const mapPlaceholder = (mappedTypes) => {
        return ` ${mappedTypes.name}`;
    };
    const changeHandler = (value) => {
        return setFieldValue('menuFoodSafeType', value);
    };
    return (
        <React.Fragment>
            <div name="menuFoodSafeType">
                <label>Select All Food Safe Types</label>
                <Typeahead
                    id="menuFoodSafeType"
                    key="menuFoodSafeType"
                    name="menuFoodSafeType"
                    labelKey="label"
                    multiple
                    onChange={changeHandler}
                    options={foodSafeTypes?.allFoodSafeTypes}
                    placeholder={foodSafeTypePlaceholder()}
                />
                <ErrorMessage name="menuFoodSafeType" component="div" className="has-error menu-item-error-message" />
            </div>
        </React.Fragment>
    );
}

export default React.memo(FoodSafeTypesMultiSelect);
