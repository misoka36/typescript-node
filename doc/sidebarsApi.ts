import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsApi: SidebarsConfig = {
  apiSidebar: [
    'intro',
    {
      type: 'category',
      label: 'API リファレンス',
      items: [
        'reference',
      ],
    },
  ],
};

export default sidebarsApi;