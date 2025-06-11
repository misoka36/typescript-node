import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsGuides: SidebarsConfig = {
  guidesSidebar: [
    'intro',
    {
      type: 'category',
      label: 'セットアップ',
      items: [
        'setup',
      ],
    },
  ],
};

export default sidebarsGuides;