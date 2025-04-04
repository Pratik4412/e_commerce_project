const verifyEmailTemplate = ({ name, url }) => {
  return `
<p> Dear ${name}</p>
<a href=${url} style="color:white; background: #071263; margin-top: 10px, padding:8px 20px">Verify Email</a>
<p> hello</p>
`;
};

export default verifyEmailTemplate;
