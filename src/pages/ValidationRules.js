
export default {
     required: (value) => (!!value ? true : 'Required'),
     deepRequired: (value) => (!!value || value === 0 ? true : 'Required'),
    };
    
    