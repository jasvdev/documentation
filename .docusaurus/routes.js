import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/documentation/markdown-page',
    component: ComponentCreator('/documentation/markdown-page', '1c7'),
    exact: true
  },
  {
    path: '/documentation/docs',
    component: ComponentCreator('/documentation/docs', '40a'),
    routes: [
      {
        path: '/documentation/docs/next',
        component: ComponentCreator('/documentation/docs/next', '4be'),
        routes: [
          {
            path: '/documentation/docs/next',
            component: ComponentCreator('/documentation/docs/next', '70d'),
            routes: [
              {
                path: '/documentation/docs/next/category/git',
                component: ComponentCreator('/documentation/docs/next/category/git', '00e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
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
                path: '/documentation/docs/next/docusaurus/example-mdx',
                component: ComponentCreator('/documentation/docs/next/docusaurus/example-mdx', '788'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/docusaurus/intro',
                component: ComponentCreator('/documentation/docs/next/docusaurus/intro', '0da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/docusaurus/tutorial-basics/congratulations',
                component: ComponentCreator('/documentation/docs/next/docusaurus/tutorial-basics/congratulations', '69a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/docusaurus/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/documentation/docs/next/docusaurus/tutorial-basics/create-a-blog-post', 'e66'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/docusaurus/tutorial-basics/create-a-document',
                component: ComponentCreator('/documentation/docs/next/docusaurus/tutorial-basics/create-a-document', '934'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/docusaurus/tutorial-basics/create-a-page',
                component: ComponentCreator('/documentation/docs/next/docusaurus/tutorial-basics/create-a-page', '51e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/docusaurus/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/documentation/docs/next/docusaurus/tutorial-basics/deploy-your-site', '2f5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/docusaurus/tutorial-basics/markdown-features',
                component: ComponentCreator('/documentation/docs/next/docusaurus/tutorial-basics/markdown-features', '649'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/docusaurus/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/documentation/docs/next/docusaurus/tutorial-extras/manage-docs-versions', '253'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/docusaurus/tutorial-extras/translate-your-site',
                component: ComponentCreator('/documentation/docs/next/docusaurus/tutorial-extras/translate-your-site', '6af'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/Git/about',
                component: ComponentCreator('/documentation/docs/next/Git/about', 'fae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/Git/conventional-commits',
                component: ComponentCreator('/documentation/docs/next/Git/conventional-commits', 'd87'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/Git/git-flow',
                component: ComponentCreator('/documentation/docs/next/Git/git-flow', '030'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/Git/manejo-de-ssh',
                component: ComponentCreator('/documentation/docs/next/Git/manejo-de-ssh', 'a58'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/next/Git/utils',
                component: ComponentCreator('/documentation/docs/next/Git/utils', '63f'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      },
      {
        path: '/documentation/docs',
        component: ComponentCreator('/documentation/docs', 'c5f'),
        routes: [
          {
            path: '/documentation/docs',
            component: ComponentCreator('/documentation/docs', 'ae3'),
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
                path: '/documentation/docs/docusaurus/example-mdx',
                component: ComponentCreator('/documentation/docs/docusaurus/example-mdx', 'd31'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/docusaurus/intro',
                component: ComponentCreator('/documentation/docs/docusaurus/intro', '913'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/docusaurus/tutorial-basics/congratulations',
                component: ComponentCreator('/documentation/docs/docusaurus/tutorial-basics/congratulations', '888'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/docusaurus/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/documentation/docs/docusaurus/tutorial-basics/create-a-blog-post', '1a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/docusaurus/tutorial-basics/create-a-document',
                component: ComponentCreator('/documentation/docs/docusaurus/tutorial-basics/create-a-document', '6ac'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/docusaurus/tutorial-basics/create-a-page',
                component: ComponentCreator('/documentation/docs/docusaurus/tutorial-basics/create-a-page', '23d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/docusaurus/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/documentation/docs/docusaurus/tutorial-basics/deploy-your-site', 'd16'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/docusaurus/tutorial-basics/markdown-features',
                component: ComponentCreator('/documentation/docs/docusaurus/tutorial-basics/markdown-features', '368'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/docusaurus/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/documentation/docs/docusaurus/tutorial-extras/manage-docs-versions', 'c76'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/docusaurus/tutorial-extras/translate-your-site',
                component: ComponentCreator('/documentation/docs/docusaurus/tutorial-extras/translate-your-site', '6ca'),
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
