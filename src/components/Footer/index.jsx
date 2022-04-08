import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '蚂蚁集团体验技术部出品',
  });
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'API',
          title: 'API',
          href: 'https://github.com/boogeymanCoder/sms',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/users/boogeymanCoder/projects/1',
          blankTarget: true,
        },
        {
          key: 'Frontend',
          title: 'Frontend',
          href: 'https://github.com/boogeymanCoder/sms-frontend',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
