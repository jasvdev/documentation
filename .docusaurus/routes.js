import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/documentation/__docusaurus/debug',
    component: ComponentCreator('/documentation/__docusaurus/debug', 'c3b'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/config',
    component: ComponentCreator('/documentation/__docusaurus/debug/config', 'e83'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/content',
    component: ComponentCreator('/documentation/__docusaurus/debug/content', '8fc'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/globalData',
    component: ComponentCreator('/documentation/__docusaurus/debug/globalData', 'f7c'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/metadata',
    component: ComponentCreator('/documentation/__docusaurus/debug/metadata', 'dc0'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/registry',
    component: ComponentCreator('/documentation/__docusaurus/debug/registry', '352'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/routes',
    component: ComponentCreator('/documentation/__docusaurus/debug/routes', '7c8'),
    exact: true
  },
  {
    path: '/documentation/markdown-page',
    component: ComponentCreator('/documentation/markdown-page', '1c7'),
    exact: true
  },
  {
    path: '/documentation/docs',
    component: ComponentCreator('/documentation/docs', 'd3f'),
    routes: [
      {
        path: '/documentation/docs/next',
        component: ComponentCreator('/documentation/docs/next', '948'),
        routes: [
          {
            path: '/documentation/docs/next',
            component: ComponentCreator('/documentation/docs/next', 'bcd'),
            routes: [
              {
                path: '/documentation/docs/next/category/tutorial---basics',
                component: ComponentCreator('/documentation/docs/next/category/tutorial---basics', '6a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/category/tutorial---extras',
                component: ComponentCreator('/documentation/docs/next/category/tutorial---extras', '6e4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/example-mdx',
                component: ComponentCreator('/documentation/docs/next/example-mdx', 'b8a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/intro',
                component: ComponentCreator('/documentation/docs/next/intro', 'e9d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/tutorial-basics/congratulations',
                component: ComponentCreator('/documentation/docs/next/tutorial-basics/congratulations', '229'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/documentation/docs/next/tutorial-basics/create-a-blog-post', 'b98'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/tutorial-basics/create-a-document',
                component: ComponentCreator('/documentation/docs/next/tutorial-basics/create-a-document', '5f4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/tutorial-basics/create-a-page',
                component: ComponentCreator('/documentation/docs/next/tutorial-basics/create-a-page', '170'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/documentation/docs/next/tutorial-basics/deploy-your-site', 'bc2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/tutorial-basics/markdown-features',
                component: ComponentCreator('/documentation/docs/next/tutorial-basics/markdown-features', '625'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/documentation/docs/next/tutorial-extras/manage-docs-versions', 'c49'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/tutorial-extras/translate-your-site',
                component: ComponentCreator('/documentation/docs/next/tutorial-extras/translate-your-site', '4c5'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      },
      {
        path: '/documentation/docs',
        component: ComponentCreator('/documentation/docs', 'dfb'),
        routes: [
          {
            path: '/documentation/docs',
            component: ComponentCreator('/documentation/docs', '0a1'),
            routes: [
              {
                path: '/documentation/docs/category/tutorial---basics',
                component: ComponentCreator('/documentation/docs/category/tutorial---basics', '511'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/category/tutorial---extras',
                component: ComponentCreator('/documentation/docs/category/tutorial---extras', '8df'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/example-mdx',
                component: ComponentCreator('/documentation/docs/example-mdx', '6db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/intro',
                component: ComponentCreator('/documentation/docs/intro', '98f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/documentation/docs/tutorial-basics/congratulations', '9c5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/documentation/docs/tutorial-basics/create-a-blog-post', 'b84'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/documentation/docs/tutorial-basics/create-a-document', '3c0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/documentation/docs/tutorial-basics/create-a-page', '7f6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/documentation/docs/tutorial-basics/deploy-your-site', '1c1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/documentation/docs/tutorial-basics/markdown-features', 'a53'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/documentation/docs/tutorial-extras/manage-docs-versions', '5e2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/documentation/docs/tutorial-extras/translate-your-site', 'a77'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/documentation/',
    component: ComponentCreator('/documentation/', '4a1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
