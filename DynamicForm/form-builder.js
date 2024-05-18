document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dynamic-form');
    const addTextFieldButton = document.getElementById('add-text-field');
    const addCheckboxButton = document.getElementById('add-checkbox');
    const addRadioButton = document.getElementById('add-radio');

    let fieldCount = 0;

    addTextFieldButton.addEventListener('click', function() {
        addField('text');
    });

    addCheckboxButton.addEventListener('click', function() {
        addField('checkbox');
    });

    addRadioButton.addEventListener('click', function() {
        addField('radio');
    });

    function addField(type) {
        fieldCount++;
        const fieldWrapper = document.createElement('div');
        fieldWrapper.className = 'form-field';
        fieldWrapper.id = `field-${fieldCount}`;

        let field;
        switch (type) {
            case 'text':
                field = document.createElement('input');
                field.type = 'text';
                field.name = `text-field-${fieldCount}`;
                field.placeholder = `Text Field ${fieldCount}`;
                break;
            case 'checkbox':
                field = document.createElement('input');
                field.type = 'checkbox';
                field.name = `checkbox-${fieldCount}`;
                break;
            case 'radio':
                field = document.createElement('input');
                field.type = 'radio';
                field.name = `radio-group`;
                break;
        }

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            form.removeChild(fieldWrapper);
        });

        fieldWrapper.appendChild(field);
        fieldWrapper.appendChild(removeButton);
        form.appendChild(fieldWrapper);
    }
});
