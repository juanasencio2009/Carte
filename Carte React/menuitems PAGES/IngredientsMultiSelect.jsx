import React from 'react';
import { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useLocation } from 'react-router-dom';
import { useFormikContext } from 'formik';

import ingredientsService from '../../services/ingredientsService';
import toastr from 'toastr';
import logger from 'sabio-debug';

import 'toastr/build/toastr.min.css';

const _logger = logger.extend('IngredientsMultiSelect');

function IngredientsMultiSelect() {
    const location = useLocation();
    const { setFieldValue, values } = useFormikContext();
    const [ingredients, setIngredients] = useState({
        allIngredients: [],
        filteredIngredients: [],
    });

    useEffect(() => {
        serviceCall();
    }, []);
    const serviceCall = () => {
        const orgId = 1; //NOTE: this will be the user.orgId
        ingredientsService.selectIngredientsByOrgId(orgId).then(getIngredientsSuccess).catch(getIngredientsError);
    };

    const getIngredientsSuccess = (response) => {
        let arrayOfIngredients = response?.items;
        _logger('Response from Ingre getAll', response);
        setIngredients((prevState) => {
            const pd = { ...prevState };
            pd.allIngredients = arrayOfIngredients?.map(mappedIngredients);
            return pd;
        });
    };

    const mappedIngredients = (mappedIngredients) => {
        return {
            id: mappedIngredients.id,
            label: mappedIngredients.name,
        };
    };
    const getIngredientsError = (response) => {
        _logger('getIngredientsError', response);
        toastr.error('Oops, something failed fetching all Ingredients');
    };

    const ingredientsPlaceholder = () => {
        if (location.state?.payload.menuIngredients && location.state?.payload.menuIngredients !== null) {
            let menuIngredient = location.state?.payload.menuIngredients;
            let ingredient = menuIngredient.map(mapPlaceholder);
            return ingredient;
        } else if (values?.menuIngredients) {
            let value = values.menuIngredients;
            let valuesName = value.map(mapPlaceholder);
            return valuesName;
        } else {
            return 'Select Ingredients';
        }
    };
    const mapPlaceholder = (mappedIngredients) => {
        return ` ${mappedIngredients.name}`;
    };
    const changeHandler = (value) => {
        return setFieldValue('menuIngredients', value);
    };
    return (
        <React.Fragment>
            <label>Select All Ingredients</label>
            <p></p>
            <Typeahead
                id="menuIngredients"
                labelKey="label"
                name="menuIngredients"
                multiple
                onChange={changeHandler}
                options={ingredients?.allIngredients}
                placeholder={ingredientsPlaceholder()}
            />
        </React.Fragment>
    );
}

export default React.memo(IngredientsMultiSelect);
