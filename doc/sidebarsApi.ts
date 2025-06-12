import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsApi: SidebarsConfig = {
  apiSidebar: [
    'intro',
    {
      type: 'category',
      label: 'API リファレンス',
      items: [
        'reference',
        'openapi-docs',
        'openapi-swagger',
        'openapi-redoc',
      ],
    },
  ],
};

export default sidebarsApi;