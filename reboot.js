const xapi = require('xapi');

function createRebootButton() {
    xapi.command('UserInterface Extensions Panel Save', {
        PanelId: 'rebootBtn',
    }, `<Extensions>
        <Version>1.7</Version>
        <Panel>
            <Order>1</Order>
            <PanelId>rebootBtn</PanelId>
            <Type>Statusbar</Type>
            <Icon>Power</Icon>
            <Color>#FF0000</Color>
            <Name>Reboot System</Name>
            <ActivityType>Custom</ActivityType>
        </Panel>
    </Extensions>`);
}

createRebootButton();

xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
    if (event.PanelId === 'rebootBtn') {
        xapi.command('UserInterface Message Prompt Display', {
            Title: 'Reboot System',
            Text: 'Are you sure you want to reboot the system?',
            FeedbackId: 'rebootPrompt',
            'Option.1':'Yes',
            'Option.2':'No'
        });
    }
});

xapi.event.on('UserInterface Message Prompt Response', (event) => {
    if (event.FeedbackId === 'rebootPrompt') {
        if (event.OptionId === '1') {
            xapi.command('SystemUnit Boot');
        }
    }
});

