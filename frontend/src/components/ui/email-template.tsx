import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    message: string; // Added message prop
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
                                                                          message,
                                                                      }) => (
    <div>
        <h1>Account Closure Warning!</h1>
        <p>{message}</p> {/* Displaying the message */}
    </div>
);
