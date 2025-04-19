import '@testing-library/jest-dom';

jest.spyOn(console, 'warn').mockImplementation((message, ...args) => {
    const suppressedMessages = [
        'React Router Future Flag Warning',
        'v7_startTransition',
        'v7_relativeSplatPath'
    ];

    if (!suppressedMessages.some(msg => message.includes(msg))) {
        console.warn(message, ...args);
    }
});

jest.spyOn(console, 'error').mockImplementation((message, ...args) => {
    const suppressedMessages = [
        'React Router Future Flag Warning',
        'v7_startTransition',
        'v7_relativeSplatPath'
    ];

    if (!suppressedMessages.some(msg => message.includes(msg))) {
        console.error(message, ...args);
    }
});