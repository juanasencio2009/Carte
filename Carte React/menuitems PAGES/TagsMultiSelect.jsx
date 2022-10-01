import React from 'react';
import logger from 'sabio-debug';
import { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useLocation } from 'react-router-dom';
import { useFormikContext } from 'formik';
import toastr from 'toastr';

import tagService from '../../services/tagService';
import 'toastr/build/toastr.min.css';

const _logger = logger.extend('TagsMultiSelect');

function TagsMultiSelect() {
    const location = useLocation();
    const { setFieldValue, values } = useFormikContext();
    const [tag, setTag] = useState({
        allTags: [],
        filteredTags: [],
    });

    useEffect(() => {
        serviceCalls();
    }, []);
    const serviceCalls = () => {
        const orgId = 1; //NOTE: this will be the user.orgId
        tagService.getTags(orgId).then(getTagSuccess).catch(getTagError);
    };

    const getTagSuccess = (response) => {
        let arrayOfTags = response.items;
        _logger('getTagSuccess', response);

        setTag((prevState) => {
            const pd = { ...prevState };
            pd.allTags = arrayOfTags?.map(mappedTags);
            return pd;
        });
    };
    const getTagError = () => {
        toastr.error('Oops, something failed fetching all tags');
    };

    const mappedTags = (mappedTags) => {
        return {
            id: mappedTags.id,
            label: mappedTags.name,
        };
    };

    const tagsPlaceholder = () => {
        if (location.state?.payload.tags && location.state?.payload.tags !== null) {
            let tag = location.state?.payload.tags;
            let tagName = tag.map(mapPlaceholder);
            return tagName;
        } else if (values?.menuTags) {
            let value = values.menuTags;
            let valuesName = value.map(mapPlaceholder);

            return valuesName;
        } else {
            return 'Tags for a  Menu Item';
        }
    };
    const mapPlaceholder = (mappedTags) => {
        return ` ${mappedTags.name}`;
    };
    const changeHandler = (value) => {
        return setFieldValue('tags', value);
    };
    return (
        <React.Fragment>
            <label>Select All Tags</label>
            <Typeahead
                id="tags"
                name="tags"
                labelKey="label"
                multiple
                onChange={changeHandler}
                options={tag?.allTags}
                placeholder={tagsPlaceholder()}
            />
        </React.Fragment>
    );
}
export default React.memo(TagsMultiSelect);
