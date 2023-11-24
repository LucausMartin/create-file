// template object
const texTemplate = `import { FC } from 'react';

const Template: FC = () => {
  return <></>;
};

export default Template;
`;
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template</title>
</head>
<body>
    
</body>
</html>`;


const template = {
  tsx: texTemplate,
  html: htmlTemplate,
};

export default template;
