Overridden Files

1. Application/Details/index.jsx

* Added a single line (Refer below) to pass regulatory App attribute to Token Manager react Component.

                                <div>
                                    <TokenManager
                                        keyType={keyType}
                                        selectedApp={{
                                            appId: application.applicationId,
                                            label: application.name,
                                            tokenType: application.tokenType,
                                            owner: application.owner,
                                            hashEnabled: application.hashEnabled,
                                            isRegulatory:(application.attributes.regulatory === 'true'),
                                        }}
                                    />
                                </div>
2. Application/ApplicationFormHandler.jsx
* Added below to InitApplicationCreateState method to set regulatory attribute hidden

                    var regulatory = allAppAttributes[allAppAttributes.findIndex(x => x.attribute == 'regulatory')];
                    regulatory.hidden = 'true';
                    allAppAttributes[allAppAttributes.findIndex(x => x.attribute == 'regulatory')] = regulatory;

* Update HandleAttributeChange method to set checkbox value correctly.

    handleAttributesChange = (name) => (event) => {
        if (name == 'regulatory') {
            const { applicationRequest } = this.state;
            applicationRequest.attributes[name] = event.target.checked;
            this.setState({ applicationRequest });
        } else {
            const { applicationRequest } = this.state;
            applicationRequest.attributes[name] = event.target.value;
            this.setState({ applicationRequest });
        }

    };

* Added below to save Application Method to set regulatory value to true for default cases

            if (applicationRequest.attributes.regulatory == null) {
                applicationRequest.attributes.regulatory = true;
            }

3. Shared/AppsAndKeys/ApplicationCreateForm.jsx

* Imported checkbox component

            import Checkbox from '@material-ui/core/Checkbox';

* Added checkbox component to render method

                        <Checkbox
                            defaultChecked
                            color='primary'
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            id='regulatory'
                            name='regulatory'
                            onChange={handleAttributesChange('regulatory')}
                            label="Regulatory compliance Application"
                        />

4. Shared/AppsAndKeys/KeyConfiguration.jsx

* Updated isGrantTypeDisabled method to remove disabling of authorization_code and implicit grant types
        const isGrantTypeDisabled = () => {
            const { isUserOwner } = props;
            return !(isUserOwner);
        };
* Set all Grnat types to checked by default

5. Shared/AppsAndKeys/OBConfiguration.jsx

* Newly added file to hold additional fields to application create form

6. Shared/AppsAndKeys/TokenManager.jsx

* Retrieved previously set regulatory status from the props

        this.isRegulatoryApp = selectedApp.isRegulatory;

* Update getSupportedGrantType method to switch grant types based on regulatory/non-regulatory status
* GenerateKeys method updated to add sp certificate and org id as additional properties
* Updated OBConfiguration Component to set regulatory status and Spec