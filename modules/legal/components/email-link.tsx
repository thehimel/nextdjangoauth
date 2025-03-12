import React from "react";

interface EmailLinkProps {
  email: string;
}

const EmailLink: React.FC<EmailLinkProps> = ({ email }) => {
  return (
    <a className="text-foreground font-bold" href={`mailto:${email}`}>
      {email}
    </a>
  );
};

export default EmailLink;
