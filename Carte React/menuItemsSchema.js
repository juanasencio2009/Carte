import * as Yup from 'yup';

const menuItemSchema = Yup.object().shape({
    unitCost: Yup.number().min(1, 'Minimum 1 character').max(5000, 'Exceeded max numbers').required('Required'),
    name: Yup.string().min(2, 'Minimum 2 character').max(100, 'Max 100 characters').required('Required'),
    description: Yup.string().max(500, 'max 500 characters'),
    imageUrl: Yup.string().url('Invalid image address').max(255, 'max 255 characters'),
    orderStatus: Yup.number('Required').min(1, 'Int must be > 0').max(100, 'Exceeded max numbers').required('Required'),
    menuFoodSafeType: Yup.array()
        .of(
            Yup.object().shape({
                id: Yup.number().required(),
                label: Yup.string().required(),
            })
        )
        .required('Required'),
    tags: Yup.array()
        .of(
            Yup.object().shape({
                id: Yup.number().required(),
                label: Yup.string().required(),
            })
        )
        .required('Required'),
    menuIngredients: Yup.array()
        .of(
            Yup.object().shape({
                id: Yup.number().required(),
                label: Yup.string().required(),
            })
        )
        .required('Required'),
});

export default menuItemSchema;
